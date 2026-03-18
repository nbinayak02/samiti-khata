export type TCommitteeState = {
  data: TCommittee[]
  status: "idle" | "loading" | "succeeded" | "failed"
  errorMessage?: string | null
}

export type TCommittee = {
  id: number
  name: string
  description: string
  isActive: boolean
  organizationId: number
  createdBy: number
  createdAt: string
  updatedAt: string
}
