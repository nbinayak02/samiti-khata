import { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
  return <div className="w-full py-3 px-8 flex flex-col gap-5">{children}</div>;
}
