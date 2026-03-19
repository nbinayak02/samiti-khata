export type TAuthState = {
  name: string | null
  email: string | null
  role: string
  token: string | null
  isAuthenticated: boolean
  status: "pending" | "success" | "error" | "idle"
  errorMessage?: string | null
}
