"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * ReactQueryProvider is a custom React component that provides a QueryClient instance to its children components.
 * It also includes the ReactQueryDevtools component for debugging purposes.
 *
 * @param {React.ReactNode} children - The React elements to be rendered within the QueryClientProvider.
 * @returns {JSX.Element} - The JSX element that wraps the children components with the QueryClientProvider and ReactQueryDevtools.
 */
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
