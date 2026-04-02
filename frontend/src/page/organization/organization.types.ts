import type { ApiStatus } from "@/constants"

export type TOrganizationState = {
  data: TOrganization[]
  status: {
    create: ApiStatus
    fetch: ApiStatus
    fetchUserAssigned: ApiStatus
  }
  errorMessage: {
    create: string | null
    fetch: string | null
    fetchUserAssigned: string | null
  }
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
