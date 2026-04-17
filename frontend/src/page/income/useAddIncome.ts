import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IncomeRepository from "./income.repository"
import { toast } from "sonner"
import { incomeSchema, type TIncomeAddForm } from "./income.schema"

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

  const onSubmit = (data: TIncomeAddForm) => {
    // console.log(data)
    mutate(data)
  }

  return { ...form, onSubmit, isPending, isSuccess, isError }
}

export default useAddIncome
