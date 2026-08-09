import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import { createExpenseCategory } from "../api/expense-category.api";
import type { ExpenseCategorySchema } from "../schemas/expense-category.schema";

export default function useCreateExpenseCategory() {
  const { mutate, isPending } = useMutation({
    mutationFn: createExpenseCategory,
    mutationKey: [ACTIONS.CREATE, MODULES.EXPENSE_CATEGORY],
    onSuccess: () => {
      toast.add({
        title: "Expense Category created successfully.",
      });
    },
  });

  const onCreate = (data: ExpenseCategorySchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
