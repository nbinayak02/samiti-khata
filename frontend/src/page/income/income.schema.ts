import { z } from "zod"
import NepaliDate from "nepali-date-converter"
const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const incomeSchema = z
  .object({
    id: z.number().optional(),
    billNumber: z.string().min(1, "Bill number is required"),
    bookNumber: z.string().min(1, "Book number is required"),
    date: z.iso.datetime().optional(),
    nepaliDate: z
      .string()
      .min(1, "Date is required")
      .startsWith("20", { error: "Date must start with 20..." }),
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
      .transform((value) => Number(value)),
    billIssuerId: z
      .string()
      .min(1, "Bill issuer is required")
      .transform((value) => Number(value)),
    remarks: z.string().optional(),
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
      // console.log({ ISOdateString })
    return { ...data, date: ISOdateString }
  })

export type TIncomeFormData = z.infer<typeof incomeSchema>
export default incomeSchema
