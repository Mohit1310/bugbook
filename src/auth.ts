import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./lib/prisma";
import { Lucia, Session, User } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";
import { Google } from "arctic";

/**
 * Creates a new PrismaAdapter instance with the provided session and user objects from Prisma.
 * @param {Prisma.Session} session - The session object from Prisma.
 * @param {Prisma.User} user - The user object from Prisma.
 * @returns {PrismaAdapter} A new instance of PrismaAdapter.
 */
const adapter = new PrismaAdapter(prisma.session, prisma.user);

/**
 * Creates a new instance of Lucia with the provided adapter and configuration options.
 * @param {Adapter} adapter - The adapter to use with Lucia.
 * @param {Object} options - The configuration options for Lucia.
 * @param {Object} options.sessionCookie - Configuration for the session cookie.
 * @param {boolean} options.sessionCookie.expires - Whether the session cookie expires.
 * @param {Object} options.sessionCookie.attributes - Additional attributes for the session cookie.
 * @param {boolean} options.sessionCookie.attributes.secure - Whether the session cookie is secure.
 * @param {Function} options.getUserAttributes - A function that returns user attributes based on database user attributes.
 * @returns A new instance of Lucia.
 */
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      displayName: databaseUserAttributes.displayName,
      avatarUrl: databaseUserAttributes.avatarUrl,
      googleId: databaseUserAttributes.googleId,
    };
  },
});

/**
 * Validates a request by checking the session ID and creating session cookies if needed.
 * @returns A promise that resolves to an object containing either the user and session or null values.
 */
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  googleId: string | null;
}

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
);

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return { user: null, session: null };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);
