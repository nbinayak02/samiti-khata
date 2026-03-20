import type { TCommittee } from "../committee/committee.types"
import type { TBillIssuer } from "../user/user.types"

export type TIncome = {
  id: number
  billNo: string
  bookNo: string
  date: string
  name: string
  address: string
  amount: number
  committee: TCommittee
  billIssuer: TBillIssuer
  remarks?: string
  createdAt: string
  updatedAt: string
}
