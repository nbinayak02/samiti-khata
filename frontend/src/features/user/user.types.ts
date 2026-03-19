export type TUserState = {
  data: TUser[] 
  status: "idle" | "loading" | "succeeded" | "failed"
  errorMessage: string | null
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
