import { toast } from "sonner"
import { useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import CategoryRepository from "./category.repository"

const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: number) => CategoryRepository.delete(id),

    onError: () => {
      toast.dismiss("deleteCategory")
      toast.error("Failed to delete category")
    },
    onSuccess: () => {
      toast.dismiss("deleteCategory")
      toast.success("Category deleted successfully")
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      })
    },
  })

  useEffect(() => {
    if (isDeleting) {
      toast.loading("Deleting Category...", { id: "deleteCategory" })
    }
  }, [isDeleting])

  return { deleteCategory: mutate }
}

export default useDeleteCategory
