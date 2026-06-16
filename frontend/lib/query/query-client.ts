import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "../error/getErrorMessage";

function isErrorOn4xxRange(error: any) {
  if (error?.status >= 400 && error?.status < 500) {
    return true;
  }
  return false;
}

export function queryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (!isErrorOn4xxRange(error)) {
          toast.error(getErrorMessage(error));
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variable, context, mutation) => {
        if (mutation.options.onError) return;
        if (!isErrorOn4xxRange(error)) toast.error(getErrorMessage(error));
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus:
          process.env.NODE_ENV === "production" ? false : true,
        refetchOnReconnect: true,
        refetchOnMount: true,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: (failureCount, error: any) => {
          // don't retry on 4xx errors
          if (isErrorOn4xxRange(error)) return false;
          // retry 2 times only
          return failureCount < 2;
        },
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
        throwOnError: false,
      },
      mutations: {
        retry: false,
        throwOnError: false,
      },
    },
  });
}
