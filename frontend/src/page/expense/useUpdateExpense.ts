import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ExpenseSchema, { type TExpenseFormData } from "./expense.schema"
import ExpenseRepository from "./expense.repository"

type setDefaultValuesProps = Omit<
  TExpenseFormData,
  "committeeId" | "categoryId" | "date"
> & {
  committeeId: string
  categoryId: string
  date?: string
}

const useUpdateExpense = () => {
  const form = useForm({
    resolver: zodResolver(ExpenseSchema),
  })

  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["updateExpense", { id: form.getValues("id") }],
    mutationFn: ExpenseRepository.update,
    onSuccess: () => {
      toast.success("Expense updated successfully")
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      })
    },
  })

  const setDefaultValues = (defaultValues: setDefaultValuesProps) => {
    form.reset({ ...defaultValues })
  }

  const onSubmit = (data: TExpenseFormData) => {
    console.log(data)
    mutate(data)
  }

  return { ...form, onSubmit, isPending, isSuccess, isError, setDefaultValues }
}

export default useUpdateExpense
