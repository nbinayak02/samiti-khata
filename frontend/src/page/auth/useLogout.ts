import { useAppDispatch } from "@/hooks/typeSafeReduxHooks"
import { setUserLogOut } from "./auth.slice"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const logOutUser = () => {
    dispatch(setUserLogOut())
    localStorage.removeItem("token")
    localStorage.removeItem("userInfo")
    navigate("/login", { replace: true })
  }

  return { logOutUser }
}
