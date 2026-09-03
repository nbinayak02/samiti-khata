import type { Dispatch, SetStateAction } from "react";
import { type ModifyReasonSchema } from "@/schema/reason.schema";
import { DeleteAlertDialog } from "@/components/Delete-Alert-Dialog";
import useDeleteExpense from "../hooks/useDeleteExpense";

type Props = {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
};

export default function DeleteExpenseAlertDialog({
  id,
  open,
  setOpen,
  onDeleteSuccess,
}: Props) {
  const { mutate, isPending } = useDeleteExpense({
    onSettled: () => setOpen(false),
    onSuccess: onDeleteSuccess,
  });

  return (
    <DeleteAlertDialog
      open={open}
      setOpen={setOpen}
      id={id}
      isPending={isPending}
      message="This will mark the expense as deleted but still be available for certain period for audit purposes."
      onSubmit={(data: ModifyReasonSchema) => mutate(data)}
    />
  );
}
