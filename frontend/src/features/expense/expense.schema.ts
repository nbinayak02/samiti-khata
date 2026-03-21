import z from "zod"

const ExpenseSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  particulars: z.string().min(1, "Particulars is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Amount must be a valid number upto 2 decimal places, e.g. 100 or 100.50"
    )
    .refine((value) => Number(value) > 0, "Amount must be greater than 0"),
  paymentMode: z.enum(["CASH", "CHEQUE", "ONLINE"], {
    error: "Payment mode is required",
  }),
  documentType: z.enum(["BILL", "VOUCHER"], {
    error: "Document type is required",
  }),
  remarks: z.string().optional(),
  categoryId: z
    .string({ error: "Category is required" })
    .transform((value) => Number(value)),
  committeeId: z
    .string({ error: "Committee is required" })
    .transform((value) => Number(value)),
})

export default ExpenseSchema
