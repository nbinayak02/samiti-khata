import type { TCommittee } from "../committee/committee.types"
import type { TBillIssuer } from "../user/user.types"

export type TIncome = {
  id: number
  billNumber: string
  bookNumber: string
  date: string
  nepaliDate: string
  name: string
  address: string
  amount: number
  committee: TCommittee
  billIssuer: TBillIssuer
  remarks?: string
  createdAt: string
  updatedAt: string
}

export type TIncomeResponse = {
  message: string
  data: TIncome[]
  pageNumber: number
  pageSize: number
  totalPages: number
}
