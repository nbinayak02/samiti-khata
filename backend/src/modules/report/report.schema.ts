import z from "zod";

const SearchReportSchema = z
  .object({
    isSearchByDocument: z.string().transform((value) => value === "true"),

    name: z.string().optional(),

    committeeId: z
      .string({ error: "Committee is required" })
      .transform((value) => Number(value)),

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
  })
  .refine(
    (data) => {
      if (data.isSearchByDocument) {
        return !!data.documentType && !!data.documentNumber;
      } else {
        return !!data.name;
      }
    },
    {
      message:
        "Provide document details for document search, or a name for name search",
      path: ["validationError"],
    },
  );

export default SearchReportSchema;
