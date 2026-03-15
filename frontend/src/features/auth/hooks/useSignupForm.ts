import { toast } from "sonner"
import getErrorMessage from "@/lib/error-utils"
import { signup } from "../services/authServices"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { signUpSchema, type TSignupFormData } from "../model/schema"

export const useSignupForm = () => {
  const form = useForm({ resolver: zodResolver(signUpSchema) })

  const onSubmit: SubmitHandler<TSignupFormData> = async (formData) => {
    delete formData.confirmPassword
    try {
      const response = await signup(formData)
      console.log("Signup successful:", response)
      toast.success("Signup Successful!", { position: "top-center" })
    } catch (error) {
      toast.error(getErrorMessage(error), {
        position: "top-center",
      })
    }
  }

  return {
    ...form,
    onSubmit,
  }
}
