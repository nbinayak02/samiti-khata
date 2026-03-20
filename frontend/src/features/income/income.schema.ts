import z, { transform } from "zod"

const incomeSchema = z.object({
  billNo: z.string().min(1, "Bill number is required"),
  bookNo: z.string().min(1, "Book number is required"),
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Amount must be a valid number upto 2 decimal places, e.g. 100 or 100.50"
    )
    .refine((value) => Number(value) > 0, "Amount must be greater than 0"),
  committeeId: z
    .string()
    .min(1, "Committee is required")
    .refine((value) => Number(value)),
  billIssuerId: z
    .string()
    .min(1, "Bill issuer is required")
    .refine((value) => Number(value)),
  remarks: z.string().optional(),
})

export type TIncomeFormData = z.infer<typeof incomeSchema>
export default incomeSchema
