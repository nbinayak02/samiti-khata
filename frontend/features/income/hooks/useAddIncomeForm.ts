"use client";
import {
  AddIncomeInput,
  AddIncomeOutput,
  incomeSchema,
} from "../addIncome.schema";
import { toast } from "sonner";
import { addIncome } from "../income.api";
import { useForm } from "react-hook-form";
import { QUERY_KEYS } from "@/lib/query/query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddIncomeForm() {
  const form = useForm<AddIncomeInput, unknown, AddIncomeOutput>({
    resolver: zodResolver(incomeSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: [QUERY_KEYS.ADD_INCOME],
    mutationFn: addIncome,
    onSuccess: () => {
      toast.success("Income added successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INCOME] });
    },
  });

  const onSubmit = (data: AddIncomeOutput) => {
    mutate(data);
  };

  return {
    ...form,
    onSubmit,
    isPending,
    isSuccess,
    isError,
    serverError: error,
  };
}
