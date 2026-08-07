import * as React from "react";
import { Toaster } from "@/components/ui/toast";
import type { QueryClient } from "@tanstack/react-query";
import type { AuthContext } from "@/contexts/auth.context";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface RouterContext {
  queryClient: QueryClient;
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Toaster  />
    </React.Fragment>
  );
}
