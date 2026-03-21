import type z from "zod"
import type ExpenseSchema from "./expense.schema"
import type { TCommittee } from "../committee/committee.types"
import type { TCategory } from "../category/category.types"

export type TCreateExpense = z.infer<typeof ExpenseSchema>

export type TExpense = TCreateExpense & {
  id: number
  createdBy: number
  createdAt: Date
  updatedAt: Date
  committee: TCommittee
  category: TCategory
}
