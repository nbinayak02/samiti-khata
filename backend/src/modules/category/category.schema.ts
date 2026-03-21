import z from "zod";

const CategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
})

export default CategorySchema