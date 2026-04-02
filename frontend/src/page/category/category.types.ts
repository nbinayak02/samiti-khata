import type z from "zod"
import type CategorySchema from "./category.schema"

export type TCreateCategory = z.infer<typeof CategorySchema>

export type TCategory = TCreateCategory & {
  id: number
  organizationId: number
  createdAt: Date
  updatedAt: Date
}
