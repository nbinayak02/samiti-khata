import z from "zod";

const SearchReportSchema = z.object({
  isSearchByDocument: z.string().transform((value) => value === "true"),

  name: z.string().optional(),

  committeeId: z
    .string({ error: "Committee is required" })
    .transform((value) => Number(value))
    .optional(),

  documentType: z.string().optional(),

  documentNumber: z
    .string()
    .transform((value) => Number(value))
    .optional(),

  fromDate: z.string().optional(),

  toDate: z.string().optional(),

  billIssuerId: z
    .string()
    .transform((value) => Number(value))
    .optional(),
});

export default SearchReportSchema;
