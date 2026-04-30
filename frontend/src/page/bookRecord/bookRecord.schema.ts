import z from "zod"

const BookRecordSchema = z.object({
  bookNumber: z.number().min(1, "Book number must be greater than 0"),
  billNumberFrom: z.number().min(1, "Bill number from must be greater than 0"),
  billNumberTo: z.number().min(1, "Bill number to must be greater than 0"),
  description: z.string().optional(),
  fiscalYear: z
    .string()
    .regex(
      /^\d{4}\/\d{4}$/,
      "Fiscal year must be in the format YYYY/YYYY. Example: 2082/2083"
    ),
})
export default BookRecordSchema
