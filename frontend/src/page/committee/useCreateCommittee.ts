import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import committeeRepository from "./committee.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCommitteeSchema } from "./schema"

export const useCreateCommittee = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["addCommittee"],
    mutationFn: committeeRepository.create,
    onSuccess: () => {
      toast.success("Committee created successfully")
      queryClient.invalidateQueries({ queryKey: ["committees"] })
    },
  })

  const form = useForm({
    resolver: zodResolver(createCommitteeSchema),
  })

 
  return {
    ...form,
    mutate,
    isPending,
    isSuccess,
    isError,
  }
}
