import "./index.css";
import { StrictMode } from "react";
import { isAxiosError } from "axios";
import { routeTree } from "./routeTree.gen";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { TooltipProvider } from "./components/ui/tooltip";

function isRetryableError(error: unknown): boolean {
  if (!isAxiosError(error) || !error.response) {
    // network errors or timeouts — retryable
    return true;
  }

  const status = error.response.status;
  // retry on 408 (timeout), 429 (rate limit), and 5xx (server errors)
  return status === 408 || status === 429 || status >= 500;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown): boolean => {
        if (!isRetryableError(error)) return false;
        return failureCount < 3;
      },
    },
  },
});

const router = createRouter({
  routeTree,
  defaultPreload: false,
  scrollRestoration: true,
  context: {
    queryClient,
    user: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </TooltipProvider>
  </StrictMode>,
);
