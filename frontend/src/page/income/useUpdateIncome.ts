import { toast } from "sonner"
import { useForm } from "react-hook-form"
import IncomeRepository from "./income.repository"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateIncomeSchema, type TIncomeUpdateForm } from "./income.schema"

type setDefaultValuesProps = Omit<
  TIncomeUpdateForm,
  "committeeId" | "billIssuerId" | "date" | "description"
> & {
  committeeId: string
  billIssuerId: string
  date?: string
}

const useUpdateIncome = () => {
  const form = useForm({
    resolver: zodResolver(updateIncomeSchema),
  })

  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["updateIncome", { id: form.getValues("id") }],
    mutationFn: IncomeRepository.update,
    onSuccess: () => {
      toast.success("Income updated successfully")
      queryClient.invalidateQueries({
        queryKey: ["incomes"],
      })
    },
  })

  const setDefaultValues = (defaultValues: setDefaultValuesProps) => {
    form.reset({ ...defaultValues })
  }

  return { ...form, mutate, isPending, isSuccess, isError, setDefaultValues }
}

export default useUpdateIncome
