import { useMutation, useQueryClient } from "@tanstack/react-query"
import IncomeRepository from "../income/income.repository"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import committeeRepository from "./committee.service"

const useDeleteCommittee = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteCommittee"],
    mutationFn: (id: number) => committeeRepository.delete(id),

    onError: () => {
      toast.dismiss("deleteCommittee")
      toast.error("Failed to delete committee")
    },
    onSuccess: () => {
      toast.dismiss("deleteCommittee")
      toast.success("Committee deleted successfully")
      queryClient.invalidateQueries({
        queryKey: ["committees"],
      })
    },
  })

  useEffect(() => {
    if (isDeleting) {
      toast.loading("Deleting Committee...", { id: "deleteCommittee" })
    }
  }, [isDeleting])

  return { deleteCommittee: mutate }
}

export default useDeleteCommittee
