type UserProfile = {
  id?: number
  fullName: string
  email: string
  address: string
  phoneNumber: string
  createdAt?: string
  updatedAt?: string
  role?: string
}

type UserProfileHeader = Pick<
  UserProfile,
  "fullName" | "email" | "address" | "phoneNumber" | "role"
>
export type { UserProfile, UserProfileHeader }
