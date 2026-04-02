import { toast } from "sonner"
import getErrorMessage from "@/lib/error-utils"
import { signup } from "./auth.services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { signUpSchema, type TSignupFormData } from "./auth.schema"
import { useState } from "react"

export const useSignupForm = () => {
  const form = useForm({ resolver: zodResolver(signUpSchema) })
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<TSignupFormData> = async (formData) => {
    delete formData.confirmPassword
    console.log("Form data: ", formData)
    try {
      setLoading(true)
      await signup(formData)
      toast.success("Signup Successful!")
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return {
    ...form,
    onSubmit,
    loading,
  }
}
