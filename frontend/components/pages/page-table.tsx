import { ReactNode } from "react";
import ComponentErrorBoundary from "../errors/error-boundary";

type PageTableProps = {
  children: ReactNode;
};
export default function PageTable({ children }: PageTableProps) {
  return (
    <div className="mt-5 px-10 flex-1 min-h-0 flex flex-col overflow-hidden">
      <ComponentErrorBoundary>{children}</ComponentErrorBoundary>
    </div>
  );
}
