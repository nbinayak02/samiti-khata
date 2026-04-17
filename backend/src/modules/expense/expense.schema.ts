import z from "zod";

const expenseSchema = z.object({
  date: z.iso.datetime({ error: "Invalid date format" }),
  nepaliDate: z.string().min(1, "Date is required"),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  particulars: z.string().min(1, "Particulars is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Amount must be a valid number upto 2 decimal places, e.g. 100 or 100.50",
    )
    .refine((value) => Number(value) > 0, "Amount must be greater than 0"),
  paymentMode: z.enum(["CASH", "CHEQUE", "ONLINE"], {
    error: "Payment mode is required",
  }),
  documentType: z.enum(["BILL", "VOUCHER"], {
    error: "Document type is required",
  }),
  remarks: z.string().optional(),
  categoryId: z.number({ error: "Category is required" }),
  committeeId: z.number({ error: "Committee is required" }),
});

const expenseUpdateSchema = expenseSchema.extend({
  description: z.string().min(1, "Description is required"),
});

export { expenseUpdateSchema, expenseSchema };
