import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { QUERY_KEYS } from "@/lib/query/query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFiscalYear } from "../api/fiscalYear.client.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFiscalYearSchema, FiscalYearSchema } from "../fiscalYear.schema";

export default function useAddFiscalYear() {
  const form = useForm({
    resolver: zodResolver(createFiscalYearSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: [QUERY_KEYS.ADD_FISCAL_YEAR],
    mutationFn: addFiscalYear,
    onSuccess: () => {
      toast.success("Fiscal Year added successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FISCAL_YEAR] });
    },
  });

  const onSubmit = (data: FiscalYearSchema) => {
    console.log("FOrm submitted");
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
