import { toast } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { ACTIONS, MODULES } from "@/constants/constants";
import { createFiscalYear } from "../api/fiscal-year.api";
import type { FiscalYearSchema } from "../schemas/fiscal-year.schema";

export default function useCreateFiscalYear() {
  const { mutate, isPending } = useMutation({
    mutationFn: createFiscalYear,
    mutationKey: [ACTIONS.CREATE, MODULES.FISCAL_YEAR],
    onSuccess: () => {
      toast.add({
        title: "Fiscal Year created successfully.",
      });
    },
  });

  const onCreate = (data: FiscalYearSchema) => {
    mutate(data);
  };

  return {
    onCreate,
    isPending,
  };
}
