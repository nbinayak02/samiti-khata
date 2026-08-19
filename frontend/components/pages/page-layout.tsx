import { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col gap-1 overflow-hidden">
      {children}
    </div>
  );
}
