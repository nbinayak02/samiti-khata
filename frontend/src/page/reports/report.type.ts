import type z from "zod"
import type SearchReportSchema from "./report.schema"

export type TDocument = "billNumber" | "bookNumber"
export type TSearchForm = z.infer<typeof SearchReportSchema>
export type TSearchFormWithoutDocumentFlag = Omit<
  TSearchForm,
  "isSearchByDocument"
>

export type TIncomeReportInitialState = {
  committeeId: string
  name: string
  billNumber: string
  bookNumber: string
  fromDate: string
  toDate: string
  billIssuerId: string
  totalPages?: number
  currentPage: number
  pageSize: number
  isDownloading: boolean
}

export type TExpenseReportInitialState = {
  committeeId: string
  categoryId: string
  name: string
  address: string
  paymentMode: string
  documentType: string
  fromDate: string
  toDate: string
  totalPages?: number
  currentPage: number
  pageSize: number
  isDownloading: boolean
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

export type EExpenseReportReducer =
  | "committeeId"
  | "categoryId"
  | "documentType"
  | "paymentMode"
  | "name"
  | "address"
  | "fromDate"
  | "toDate"
