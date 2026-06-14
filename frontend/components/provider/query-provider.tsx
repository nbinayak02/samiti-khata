"use client";

import { ReactNode, useState } from "react";
import { queryClient } from "@/lib/query/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => queryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
