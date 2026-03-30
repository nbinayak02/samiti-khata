import z from "zod"

const SearchReportSchema = z
  .object({
    isSearchByDocument: z.boolean(),

    name: z.string().optional(),

    committeeId: z.string({ error: "Committee is required" }),

    documentType: z.string().optional(),

    documentNumber: z
      .string()
      .regex(/^\d+$/, "Document number must be numeric")
      .optional(),

    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    billIssuerId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isSearchByDocument) {
      // Searching by document - need both documentType and documentNumber
      if (!data.documentType) {
        ctx.addIssue({
          code: "custom",
          path: ["documentType"],
          message: "Document type is required.",
        })
      }
      if (!data.documentNumber) {
        ctx.addIssue({
          code: "custom",
          path: ["documentNumber"],
          message: "Document number is required.",
        })
      }
    } else {
      // Searching by name - need name field
      if (!data.name) {
        ctx.addIssue({
          code: "custom",
          path: ["name"],
          message: "Name is required.",
        })
      }
    }
  })

export default SearchReportSchema
