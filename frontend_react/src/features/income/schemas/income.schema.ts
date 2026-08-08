import { PaymentModes } from "@/constants/paymentModes";
import z from "zod";
import NepaliDate from "nepali-date-converter";

export const createIncomeSchema = z
  .object({
    billNumber: z
      .number()
      .positive("Invalid Bill Number.")
      .min(1, "Invalid Bill Number."),

    bookNumber: z
      .number()
      .positive("Invalid Book Number.")
      .min(1, "Invalid Book Number."),

    receiptBookId: z
      .number()
      .positive("Invalid Book Number.")
      .min(1, "Invalid Book Number.")
      .optional(),

    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 chars long.")
      .max(50, "Name cannot exceed 50 characters."),

    address: z
      .string()
      .trim()
      .min(2, "Address must be at least 2 chars long.")
      .max(50, "Address cannot exceed 50 characters."),

    amount: z
      .string("Amount is required.")
      .regex(/^\d+(\.\d{1,2})?$/, {
        error:
          "Invalid amount. Amount should contain at most 2 numbers after decimal point and the amount should be positive.",
      })
      .transform((a) => Number(a)),

    paymentMode: z.enum(PaymentModes),

    remarks: z.string().optional(),

    billIssuerId: z
      .number()
      .positive("Invalid Category")
      .min(1, "Invalid Category")
      .optional(),

    committeeId: z
      .number("Committee is required.")
      .positive("Invalid Committee")
      .min(1, "Invalid Committee."),

    date: z.iso.datetime("Date is required.").optional(),

    nepaliDate: z
      .string("Date is required.")
      .regex(/^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02])$/, {
        message: "Invalid date.",
      }),

    subCommitteeId: z.number().positive().optional(),
  })
  .transform((data) => {
    const ISOdateString = new NepaliDate(data.nepaliDate)
      .toJsDate()
      .toISOString();
    return { ...data, date: ISOdateString };
  });

export type CreateIncomeSchema = z.infer<typeof createIncomeSchema>;
