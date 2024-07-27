import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Layout component that checks if the user is authenticated and redirects to the home page if they are.
 * @param {React.ReactNode} children - The children components to be rendered within the layout.
 * @returns {JSX.Element} - The layout component with the children components.
 */
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
}
