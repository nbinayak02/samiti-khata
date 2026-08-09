import { toast } from "@/components/ui/toast";
import { createIncome } from "../api/income.api";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { CreateIncomeSchema } from "../schemas/income.schema";

export default function useCreateIncome() {
  const { mutate, isPending } = useMutation({
    mutationFn: createIncome,
    mutationKey: [ACTIONS.CREATE, MODULES.INCOME],
    onSuccess: () => {
      toast.add({
        title: "Income created successfully.",
      });
    },
  });

  const onCreate = (data: CreateIncomeSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
