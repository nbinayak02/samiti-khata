import z from "zod"

const CategorySchema = z.object({
  name: z.string().min(2, "Category name is required."),
  description: z.string().optional(),
})

export default CategorySchema
