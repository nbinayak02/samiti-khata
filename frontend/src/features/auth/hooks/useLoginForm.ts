import { toast } from "sonner"
import { useState } from "react"
import { useAuth } from "@/context/authContext"
import getErrorMessage from "@/lib/error-utils"
import { login } from "../services/authServices"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { logInSchema, type TLoginFormData } from "../model/schema"

export const useLoginForm = () => {
  const [loginSuccess, setLoginSuccess] = useState(false)
  const form = useForm({ resolver: zodResolver(logInSchema) })
  const { setUserLogIn } = useAuth()

  const onSubmit: SubmitHandler<TLoginFormData> = async (formData) => {
    try {
      const response = await login(formData)
      console.log("Login successful:", response)
      setUserLogIn(response.data.token, response.data.userInfo)
      setLoginSuccess(true)
      toast.success("Login Successful")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return {
    ...form,
    onSubmit,
    isLoginSuccess: loginSuccess,
  }
}
