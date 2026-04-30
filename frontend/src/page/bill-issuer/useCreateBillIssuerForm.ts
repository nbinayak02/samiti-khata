import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import billIssuerSchema from "./billIssuer.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import billIssuerRepository from "./billIssuer.repository"
import { toast } from "sonner"

const useCreateBillIssuerForm = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["createBillIssuer"],
    mutationFn: billIssuerRepository.create,
    onSuccess: () => {
      toast.success("Bill issuer created successfully")
      queryClient.invalidateQueries({ queryKey: ["billIssuers"] })
    },
  })
  const form = useForm({ resolver: zodResolver(billIssuerSchema) })

 
  return {
    ...form,
    mutate,
    isLoading: isPending,
    isSuccess,
    isError,
  }
}

export default useCreateBillIssuerForm
