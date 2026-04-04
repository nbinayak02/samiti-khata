import { useMutation, useQueryClient } from "@tanstack/react-query"
import IncomeRepository from "../income/income.repository"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const useDeleteIncome = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteIncome"],
    mutationFn: (id: number) => IncomeRepository.delete(id),

    onError: () => {
      toast.dismiss("deleteIncome")
      toast.error("Failed to delete income")
    },
    onSuccess: () => {
      toast.dismiss("deleteIncome")
      toast.success("Income deleted successfully")
      queryClient.invalidateQueries({
        queryKey: ["incomes"],
      })
    },
  })

  useEffect(() => {
    if (isDeleting) {
      toast.loading("Deleting income...", { id: "deleteIncome" })
    }
  }, [isDeleting])

  return { deleteIncome: mutate }
}

export default useDeleteIncome
