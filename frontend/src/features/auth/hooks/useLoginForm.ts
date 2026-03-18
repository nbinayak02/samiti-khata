import { logInUser } from "../slice/authSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { logInSchema, type TLoginFormData } from "../model/schema"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"

export const useLoginForm = () => {
  const form = useForm({ resolver: zodResolver(logInSchema) })
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated)

  const onSubmit: SubmitHandler<TLoginFormData> = async (formData) => {
    dispatch(logInUser(formData))
  }

  return {
    ...form,
    onSubmit,
    isLoginSuccess: isLoggedIn,
  }
}
