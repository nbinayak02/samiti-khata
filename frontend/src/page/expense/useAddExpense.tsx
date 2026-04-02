import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import ExpenseRepository from "./expense.repository"
import ExpenseSchema from "./expense.schema"
import type { TCreateExpense } from "./expense.types"

const useAddExpense = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addExpense"],
    mutationFn: ExpenseRepository.create,
    onSuccess: () => {
      toast.success("Expense added successfully")
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
    },
  })
  const form = useForm({
    resolver: zodResolver(ExpenseSchema),
  })

  const onSubmit = (data: TCreateExpense) => {
    console.log(data)
    mutate(data)
  }

  return { ...form, onSubmit, isPending, isSuccess, isError }
}

export default useAddExpense
