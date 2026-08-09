import { toast } from "@/components/ui/toast";
import { createExpense } from "../api/expense.api";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { CreateExpenseSchema } from "../schemas/expense.schema";

export default function useCreateExpense() {
  const { mutate, isPending } = useMutation({
    mutationFn: createExpense,
    mutationKey: [ACTIONS.CREATE, MODULES.EXPENSE],
    onSuccess: () => {
      toast.add({
        title: "Expense created successfully.",
      });
    },
  });

  const onCreate = (data: CreateExpenseSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
