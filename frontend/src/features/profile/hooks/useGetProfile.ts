import { toast } from "sonner"
import { useState } from "react"
import getErrorMessage from "@/lib/error-utils"
import type { UserProfile } from "../model/schema"
import { getUserProfile } from "../services/profile-services"

const useGetProfile = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<UserProfile | null>(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await getUserProfile()
      setData(response.data.user)
    } catch (error) {
      console.error("Error fetching user profile:", error)
      setError(getErrorMessage(error))
      toast.error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, data, fetchUser }
}

export default useGetProfile
