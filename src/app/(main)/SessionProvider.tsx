"use client";

import { Session, User } from "lucia";
import React, { useContext } from "react";

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = React.createContext<SessionContext | null>(null);

/**
 * SessionProvider component that provides a session context to its children.
 * @param {React.PropsWithChildren<{ value: SessionContext }>} props - The properties of the component.
 * @param {React.ReactNode} props.children - The child components to render within the provider.
 * @param {SessionContext} props.value - The session context value to provide.
 * @returns {JSX.Element} A JSX element representing the SessionProvider component.
 */
export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

/**
 * Custom React hook that provides access to the session context.
 * Throws an error if used outside of a SessionProvider.
 * @returns The session context
 */
export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
