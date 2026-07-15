import { z } from "zod";

export const bookStatusSchema = z.enum(["AVAILABLE", "ASSIGNED", "RETURNED"]);

const baseReceiptBookSchema = z.object({
  bookNumber: z.coerce.number().int().positive(),

  receiptStartingNumber: z.coerce.number().int().positive(),

  receiptEndingNumber: z.coerce.number().int().positive(),

  fiscalYearId: z.coerce.number().int().positive(),

  status: bookStatusSchema.default("AVAILABLE"),

  assignedTo: z.coerce.number().int().positive().optional(),

  assignedAt: z.coerce.date().optional(),

  returnedAt: z.coerce.date().optional(),
});

export const addReceiptBookSchema = baseReceiptBookSchema.superRefine(
  (data, ctx) => {
    if (data.receiptEndingNumber <= data.receiptStartingNumber) {
      ctx.addIssue({
        code: "custom",
        path: ["receiptEndingNumber"],
        message:
          "Ending receipt number must be greater than starting receipt number",
      });
    }

    if (data.status === "ASSIGNED") {
      if (!data.assignedTo) {
        ctx.addIssue({
          code: "custom",
          path: ["assignedTo"],
          message: "Assigned member is required.",
        });
      }

      if (!data.assignedAt) {
        ctx.addIssue({
          code: "custom",
          path: ["assignedAt"],
          message: "Assigned date is required.",
        });
      }
    }

    if (data.status === "RETURNED") {
      if (!data.assignedTo) {
        ctx.addIssue({
          code: "custom",
          path: ["assignedTo"],
          message: "Assigned member is required.",
        });
      }

      if (!data.assignedAt) {
        ctx.addIssue({
          code: "custom",
          path: ["assignedAt"],
          message: "Assigned date is required.",
        });
      }

      if (!data.returnedAt) {
        ctx.addIssue({
          code: "custom",
          path: ["returnedAt"],
          message: "Returned date is required.",
        });
      }

      if (
        data.assignedAt &&
        data.returnedAt &&
        data.returnedAt < data.assignedAt
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["returnedAt"],
          message: "Returned date cannot be before assigned date.",
        });
      }
    }
  },
);

export type AddReceiptBook = z.infer<typeof addReceiptBookSchema>;