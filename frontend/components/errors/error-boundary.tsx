import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
export default function ComponentErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={<p className="text-rose-400">Something went wrong. Please try again later!</p>}
    >
      {children}
    </ErrorBoundary>
  );
}
