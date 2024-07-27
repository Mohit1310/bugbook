"use server";

import { lucia, validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * Logs out the current user by invalidating the session and redirecting to the login page.
 * @returns None
 */
export async function logout() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/login");
}
