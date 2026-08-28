import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  label: string;
  labelWhenPending: string;
  isPending: boolean;
};

export default function SubmitButton({
  isPending,
  label,
  labelWhenPending,
}: Props) {
  return (
    <Button type="submit">
      {isPending ? (
        <div className="flex flex-row gap-3">
          <Loader2 className="animate-spin" />
          <span>{labelWhenPending}</span>
        </div>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
}
