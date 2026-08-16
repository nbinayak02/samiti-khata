import { toast } from "sonner";
import type { AxiosError } from "axios";
import { createIncome } from "../api/income.api";
import { ACTIONS, MODULES } from "@/constants/constants";
import type { APIErrorResponse } from "@/types/apiResponse.types";
import type { CreateIncomeSchema } from "../schemas/income.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateIncome() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: createIncome,
    mutationKey: [ACTIONS.CREATE, MODULES.INCOME],
    onSuccess: () => {
      toast.success("Income Receipt added successfully.");
      queryClient.invalidateQueries({
        queryKey: [MODULES.INCOME],
      });
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      const message = error.response?.data.message;
      toast.error(message);
    },
  });

  const onCreate = (data: CreateIncomeSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
    isSuccess,
    isError,
  };
}
