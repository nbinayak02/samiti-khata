import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import CategorySchema from "./category.schema"
import CategoryRepository from "./category.repository"
import { toast } from "sonner"

const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: CategoryRepository.create,
    onSuccess: () => {
      toast.success("Category created successfully")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })
  const form = useForm({ resolver: zodResolver(CategorySchema) })



  return {
    ...form,
    mutate,
    isPending,
    isSuccess,
    isError,
  }
}

export default useCreateCategory
