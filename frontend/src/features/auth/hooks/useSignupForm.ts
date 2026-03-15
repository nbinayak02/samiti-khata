import { useForm, type SubmitHandler } from "react-hook-form"
import { signUpSchema, type TSignupFormData } from "../model/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { signup } from "../services/authServices"
import getErrorMessage from "@/lib/error-utils"

export const useSignupForm = () => {
  const form = useForm({ resolver: zodResolver(signUpSchema) })

  const onSubmit: SubmitHandler<TSignupFormData> = async (formData) => {
    delete formData.confirmPassword
    try {
      const response = await signup(formData)
      console.log("Signup successful:", response)
      toast.success("Form submitted successfully!", { position: "top-center" })
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
