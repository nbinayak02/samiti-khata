import { OctagonX } from "lucide-react";

export default function ErrorBox({ message }: { message: string | undefined }) {
  return (
    <div className="mb-4 bg-red-50 border-l-4 border-l-orange-500 p-3 flex flex-col items-start gap-2 text-red-700">
      <div className="flex flex-row items-center gap-2 font-semibold">
        <OctagonX size={18} />
        <span>Error</span>
      </div>
      {message || "Some error occured."}
    </div>
  );
}
