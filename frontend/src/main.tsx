import "./index.css"
import { StrictMode } from "react"
import { store } from "./app/store.ts"
import { Provider } from "react-redux"
import router from "./routes/routes.tsx"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { ThemeProvider } from "@/components/common/theme-provider.tsx"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { toast } from "sonner"

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred while fetching data.")
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: Error) => {
      toast.error(
        error.message || "An error occurred while performing the operation."
      )
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        const status = error?.status
        if (status && status >= 400 && status < 500) {
          return false // Don't retry for client errors
        }
        return failureCount < 3 // Retry up to 3 times for other errors
      },
      refetchOnWindowFocus: false,
      staleTime: 6000, // 1 minute
    },
  },
})

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <RouterProvider router={router} />
            </TooltipProvider>
          </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
