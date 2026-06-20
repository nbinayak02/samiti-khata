import {
  environmentManager,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "../error/getErrorMessage";

function isErrorOn4xxRange(error: any) {
  if (error?.status >= 400 && error?.status < 500) {
    return true;
  }
  return false;
}

function makeQueryClient() {
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
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 5,
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

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // each server request is independent so return new query client
    return makeQueryClient();
  } else {
    // reuse same query client if possible because tanstack has to cache the data for that user
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
