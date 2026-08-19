import { PaymentModes } from "@/constants/paymentModes";
import z from "zod";
import NepaliDate from "nepali-date-converter";

const expenseSchema = z
  .object({
    particulars: z
      .string("Particulars is required.")
      .trim()
      .min(2, "Particulars must be at least 2 chars long.")
      .max(50, "Particulars name cannot exceed 50 characters."),

    amount: z
      .string("Amount is required.")
      .regex(/^\d+(\.\d{1,2})?$/, {
        error:
          "Invalid amount. Amount should contain at most 2 numbers after decimal point and the amount should be positive.",
      })
      .transform((a) => Number(a)),

    paymentMode: z.enum(PaymentModes),

    remarks: z.string().optional(),

    categoryId: z
      .number()
      .positive("Invalid Category")
      .min(1, "Invalid Category"),

    committeeId: z
      .number("Committee is required.")
      .positive("Invalid Committee")
      .min(1, "Invalid Committee."),

    date: z.iso.datetime("Date is required.").optional(),

    nepaliDate: z
      .string()
      .regex(/^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02])$/, {
        message: "Invalid date.",
      }),

    subCommitteeId: z.number().positive().optional(),

    billNumber: z
      .number()
      .positive("Invalid Bill Number.")
      .min(1, "Invalid Bill Number.")
      .optional(),

    payerId: z
      .number()
      .positive("Invalid Payer")
      .min(1, "Invalid Payer.")
      .optional(),

    quantity: z
      .string()
      .trim()
      .min(1, "Quantity must be at least 1 char long.")
      .optional(),

    voucherNumber: z
      .string()
      .trim()
      .min(1, "Voucher number must be at least 1 char long.")
      .optional(),

    recepientAddress: z
      .string()
      .trim()
      .min(2, "Recepient Address must be at least 2 chars long.")
      .max(50, "Recepient Address cannot exceed 50 characters.")
      .optional()
      .default("empty"),

    recepientName: z
      .string()
      .trim()
      .min(2, "Recepient Name must be at least 2 chars long.")
      .max(50, "Recepient Name cannot exceed 50 characters.")
      .optional()
      .default("empty"),
  })
  .transform((data) => {
    const ISOdateString = new NepaliDate(data.nepaliDate)
      .toJsDate()
      .toISOString();
    return { ...data, date: ISOdateString };
  });

export type CreateExpenseSchema = z.infer<typeof expenseSchema>;
