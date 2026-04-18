import { z } from "zod";

const incomeSchema = z.object({
  billNumber: z.string().min(1, "Bill number is required"),
  bookNumber: z.string().min(1, "Book number is required"),
  date: z.iso.datetime({ error: "Invalid date format" }),
  nepaliDate: z.string().min(1, "Date is required"),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Amount must be a valid number upto 2 decimal places, e.g. 100 or 100.50",
    )
    .refine((value) => Number(value) >= 0, "Amount must be positive number"),
  committeeId: z.number({ error: "Committee is required" }),
  billIssuerId: z.number().nullish(),
  remarks: z.string().optional(),
});

const incomeUpdateSchema = incomeSchema.extend({
  description: z.string().min(1, "Description is required"),
});

const softDeleteSchema = z.object({
  description: z.string().min(1, "Description is required."),
});

export { incomeUpdateSchema, incomeSchema, softDeleteSchema };
