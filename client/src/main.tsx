import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
type ErrorWithResponseStatus = {
  response: {
    status: number;
  };
};

function hasResponseStatus(error: unknown): error is ErrorWithResponseStatus {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    error.response !== null &&
    "status" in (error as { response: { status?: unknown } }).response &&
    typeof (error as { response: { status?: unknown } }).response.status ===
      "number"
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount: number, error: unknown): boolean => {
        if (hasResponseStatus(error)) {
          const status = error.response.status;
          if (status === 401 || status === 403) {
            return false;
          }
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-300">
        <App />
      </div>
    </QueryClientProvider>
  </React.StrictMode>
);
