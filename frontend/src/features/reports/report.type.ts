import type z from "zod"
import type SearchReportSchema from "./report.schema"

export type TDocument = "billNumber" | "bookNumber"
export type TSearchForm = z.infer<typeof SearchReportSchema>
export type TSearchFormWithoutDocumentFlag = Omit<TSearchForm, "isSearchByDocument">
