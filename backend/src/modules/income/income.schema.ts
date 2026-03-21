import { z } from "zod";

const incomeSchema = z.object({
  billNumber: z.string().min(1, "Bill number is required"),
  bookNumber: z.string().min(1, "Book number is required"),
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
      "Amount must be a valid number upto 2 decimal places, e.g. 100 or 100.50",
    )
    .refine((value) => Number(value) > 0, "Amount must be greater than 0"),
  committeeId: z.number({ error: "Committee is required" }),
  billIssuerId: z.number({ error: "Bill issuer is required" }),
  remarks: z.string().optional(),
});

export default incomeSchema;
