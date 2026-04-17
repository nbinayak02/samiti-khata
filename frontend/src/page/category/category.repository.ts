import axiosInstance from "@/lib/apiClient"
import type { TCategory, TCreateCategory } from "./category.types"

const CategoryRepository = {
  create: async (data: TCreateCategory) => {
    const response = await axiosInstance.post("/category", data)
    return response.data.data
  },

  fetchAllByOrganization: async (): Promise<TCategory[]> => {
    const response = await axiosInstance.get("/category/organization")
    return response.data.data
  },

  delete: async (id: number) => {
    await axiosInstance.delete(`/category/${id}`)
  },
}

export default CategoryRepository
