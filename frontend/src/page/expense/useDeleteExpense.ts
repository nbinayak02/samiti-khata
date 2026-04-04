import { useMutation, useQueryClient } from "@tanstack/react-query"
import ExpenseRepository from "./expense.repository"
import { toast } from "sonner"
import { useEffect } from "react"

const useDeleteExpense = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteExpense"],
    mutationFn: (id: number) => ExpenseRepository.archive(id),

    onError: () => {
      toast.dismiss("deleteIncome")
      toast.error("Failed to delete expense")
    },
    onSuccess: () => {
      toast.dismiss("deleteExpense")
      toast.success("Expense deleted successfully")
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      })
    },
  })

  useEffect(() => {
    if (isDeleting) {
      toast.loading("Deleting expense...", { id: "deleteExpense" })
    }
  }, [isDeleting])

  return { deleteExpense: mutate }
}

export default useDeleteExpense
