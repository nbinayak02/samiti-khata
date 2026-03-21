import { useForm, type SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import CategorySchema from "./category.schema"
import CategoryRepository from "./category.repository"
import { toast } from "sonner"
import type { TCreateCategory } from "./category.types"

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

  const onSubmit: SubmitHandler<TCreateCategory> = (data) => {
    mutate(data)
  }

  return {
    ...form,
    onSubmit,
    isPending,
    isSuccess,
    isError,
  }
}

export default useCreateCategory
