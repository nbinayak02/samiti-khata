import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import incomeSchema, { type TIncomeFormData } from "./income.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IncomeRepository from "./income.repository"
import { toast } from "sonner"

const useAddIncome = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addIncome"],
    mutationFn: IncomeRepository.create,
    onSuccess: () => {
      toast.success("Income added successfully")
      queryClient.invalidateQueries({ queryKey: ["incomes"] })
    },
  })
  const form = useForm({
    resolver: zodResolver(incomeSchema),
  })

  const onSubmit = (data: TIncomeFormData) => {
    mutate(data)
  }

  return { ...form, onSubmit, isPending, isSuccess, isError }
}

export default useAddIncome
