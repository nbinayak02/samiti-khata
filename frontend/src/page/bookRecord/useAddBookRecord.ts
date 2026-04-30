import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import BookRecordRepository from "./bookRecord.repository"

const useAddBookRecord = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ["addBookRecord"],
    mutationFn: BookRecordRepository.add,
    onSuccess: () => {
      toast.success("Book record added successfully")
      queryClient.invalidateQueries({ queryKey: ["bookRecords"] })
    },
  })
  const form = useForm()
  return {
    ...form,
    mutate,
    isPending,
  }
}

export default useAddBookRecord
