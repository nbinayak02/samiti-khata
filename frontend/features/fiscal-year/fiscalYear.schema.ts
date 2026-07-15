import { z } from "zod";
import NepaliDate from "nepali-date-converter";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const baseFiscalYearSchema = z.object({
  startDateBs: z.string().trim(),
  endDateBs: z.string().trim(),
});

export const createFiscalYearSchema = baseFiscalYearSchema
  .superRefine((data, ctx) => {
    if (!data.startDateBs || !dateRegex.test(data.startDateBs)) {
      ctx.addIssue({
        code: "custom",
        path: ["startDateBs"],
        message: "Invalid start date",
      });
    }

    if (!data.endDateBs || !dateRegex.test(data.endDateBs)) {
      ctx.addIssue({
        code: "custom",
        path: ["endDateBs"],
        message: "Invalid end date",
      });
    }

    if (dateRegex.test(data.startDateBs) && dateRegex.test(data.endDateBs)) {
      const start = new NepaliDate(data.startDateBs).toJsDate();
      const end = new NepaliDate(data.endDateBs).toJsDate();

      if (start >= end) {
        ctx.addIssue({
          code: "custom",
          path: ["endDateBs"],
          message: "End date must be after start date",
        });
      }
    }
  })
  .transform((data) => ({
    ...data,
    startDateIso: new NepaliDate(data.startDateBs).toJsDate().toISOString(),
    endDateIso: new NepaliDate(data.endDateBs).toJsDate().toISOString(),
  }));

export type CreateFiscalYearInput = z.infer<typeof createFiscalYearSchema>;
