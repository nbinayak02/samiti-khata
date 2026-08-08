import { BookStatus } from "@/constants/bookStatus";
import z from "zod";

export const receiptBookSchema = z
  .object({
    bookNumber: z
      .number("Book Number is required.")
      .positive()
      .min(1, "Invalid Book Number"),

    receiptStartingNumber: z
      .number("Receipt Starting Number is required.")
      .positive()
      .min(1, "Invalid Receipt Starting Number"),

    receiptEndingNumber: z
      .number("Receipt Ending Number is required.")
      .positive()
      .min(1, "Invalid Receipt Ending Number"),

    fiscalYearId: z
      .number("Fiscal Year is required.")
      .positive()
      .min(1, "Invalid Fiscal Year."),

    status: z.enum(BookStatus),

    assignedTo: z
      .number()
      .positive("Invalid Member Assigned")
      .min(1, "Invalid Member Assigned.")
      .optional(),

    assignedAt: z.iso.datetime().optional(),
    returnedAt: z.iso.datetime().optional(),
  })
  .superRefine((data, context) => {
    // receipt start number can't be less than end number
    if (data.receiptStartingNumber <= data.receiptEndingNumber) {
      context.addIssue({
        code: "custom",
        path: ["receiptStartingNumber", "receiptEndingNumber"],
      });
    }
  });

export type ReceiptBookSchema = z.infer<typeof receiptBookSchema>;
