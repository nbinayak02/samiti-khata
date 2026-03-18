export type TOrganizationState = {
  data: TOrganization[]
  status: "idle" | "loading" | "succeeded" | "failed"
  errorMessage?: string | null
}

export type TOrganization = {
  id: number
  name: string
  address: string
  email: string
  phoneNumber: string
  createdBy: number
  createdAt: string
  updatedAt: string
}
