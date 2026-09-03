import type { Dispatch, SetStateAction } from "react";
import useDeleteIncome from "../hooks/useDeleteIncome";
import { type ModifyReasonSchema } from "@/schema/reason.schema";
import { DeleteAlertDialog } from "@/components/Delete-Alert-Dialog";

type Props = {
  id: number
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
};

export default function DeleteIncomeAlertDialog({
  id,
  open,
  setOpen,
  onDeleteSuccess,
}: Props) {
  const { mutate, isPending } = useDeleteIncome({
    onSettled: () => setOpen(false),
    onSuccess: () => onDeleteSuccess(),
  });

  return (
    <DeleteAlertDialog
      open={open}
      setOpen={setOpen}
      id={id}
      isPending={isPending}
      message="This will mark the income as deleted but still be available for certain period for audit purposes."
      onSubmit={(data: ModifyReasonSchema) => mutate(data)}
    />
  );
}
