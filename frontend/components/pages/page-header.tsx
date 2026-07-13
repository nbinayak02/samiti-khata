import { ReactNode } from "react";

export default function PageHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row justify-between px-10 py-5 shrink-0">
      {children}
    </div>
  );
}
