import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-row gap-3">
      <LoaderCircle className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
}
