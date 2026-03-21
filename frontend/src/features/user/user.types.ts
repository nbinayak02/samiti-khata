import type { ApiStatus } from "@/constants"

export type TUserState = {
  users: TUser[]
  billIssuers: TBillIssuer[]
  status: {
    fetchAllAdmin: ApiStatus
    fetchBillIssuers: ApiStatus
    approveAdmin: ApiStatus
  }

  errorMessage: {
    fetchAllAdmin: string | null
    fetchBillIssuers: string | null
    approveAdmin: string | null
  }
}

export type TUser = {
  id: number
  fullName: string
  email: string
  address: string
  phoneNumber: string
  role: "OWNER" | "ADMIN" | "OPERATOR"
  status?: "active" | "inactive" | "pending" | "suspended"
  createdAt: string
  updatedAt: string
  userOrganizations: TUserOrganization[]
}

export type TBillIssuer = {
  id: number
  name: string
  address: string
  phone: string
  organizationId: number
  createdAt: string
  updatedAt: string
}

export type TUserOrganization = {
  id: number
  userId: number
  organizationId: number
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED"
  createdAt: string
  updatedAt: string
}

export type TApproveUserPayload = {
  userId: number
  organizationId: number
}