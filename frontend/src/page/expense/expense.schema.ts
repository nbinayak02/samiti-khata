import NepaliDate from "nepali-date-converter"
import z from "zod"
const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const baseExpenseSchema = z.object({
  id: z.number().optional(),
  date: z.iso.date({ error: "Invalid date format" }).optional(),
  nepaliDate: z
    .string()
    .min(1, "Date is required")
    .startsWith("20", { error: "Date must start with 20..." }),
  recepientName: z.string().min(1, "Recepient Name is required"),
  recepientAddress: z.string().min(1, "Recepient Address is required"),
  particulars: z.string().min(1, "Particulars is required"),
  quantity: z.string().optional(),

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
  voucherNumber: z.string().optional(),
  billNumber: z.string().optional(),
  remarks: z.string().optional(),
  categoryId: z
    .string({ error: "Category is required" })
    .transform((value) => Number(value)),
  committeeId: z
    .string({ error: "Committee is required" })
    .transform((value) => Number(value)),
  subCommitteeId: z.number().optional(),
  payerId: z
    .string()
    .transform((value) => Number(value))
    .optional(),
})

const ExpenseSchema = baseExpenseSchema
  .superRefine((data, ctx) => {
    if (!data.nepaliDate || !dateRegex.test(data.nepaliDate)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid Nepali date",
        path: ["nepaliDate"],
      })
    }
  })
  .transform((data) => {
    const ISOdateString = new NepaliDate(data.nepaliDate)
      .toJsDate()
      .toISOString()
    return { ...data, date: ISOdateString }
  })

const UpdateExpenseSchema = baseExpenseSchema
  .extend({
    description: z.string().min(1, "Provide a valid reason."),
  })
  .superRefine((data, ctx) => {
    if (!data.nepaliDate || !dateRegex.test(data.nepaliDate)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid Nepali date",
        path: ["nepaliDate"],
      })
    }
  })
  .transform((data) => {
    const ISOdateString = new NepaliDate(data.nepaliDate)
      .toJsDate()
      .toISOString()
    return { ...data, date: ISOdateString }
  })

export type TDelete = {
  id: number
  description: string
}

export type TExpenseAddForm = z.infer<typeof ExpenseSchema>
export type TExpenseUpdateForm = z.infer<typeof UpdateExpenseSchema>

export { ExpenseSchema, UpdateExpenseSchema }
