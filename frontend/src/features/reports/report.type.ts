import type z from "zod"
import type SearchReportSchema from "./report.schema"

export type TDocument = "billNumber" | "bookNumber"
export type TSearchForm = z.infer<typeof SearchReportSchema>
export type TSearchFormWithoutDocumentFlag = Omit<
  TSearchForm,
  "isSearchByDocument"
>

export type TIncomeReportInitialState = {
  isSearchByDocument: string
  committeeId: string
  name: string 
  billNumber: string 
  bookNumber: string 
  fromDate: string 
  toDate: string 
  billIssuerId: string 
}

// export type TIncomeReportInitialState = TIncomeReport & {
//   errors?: Omit<TIncomeReport, "isSearchByDocument"> | undefined
// }

export type EIncomeReportReducer =
  | "committeeId"
  | "billNumber"
  | "bookNumber"
  | "name"
  | "fromDate"
  | "toDate"
  | "billIssuerId"
