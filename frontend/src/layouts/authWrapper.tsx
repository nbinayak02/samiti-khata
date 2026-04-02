import { setUserAuthInfo } from "@/page/auth/auth.slice"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { Navigate } from "react-router-dom"

const AuthWapper = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  // if user is not authenticated, check local storage for token and user info
  // and set it in the redux store

  if (!isAuthenticated) {
    const dispatch = useAppDispatch()
    const token = localStorage.getItem("token")
    const userInfo = localStorage.getItem("userInfo")

    if (!userInfo || !token) {
      return <Navigate to="/login" replace />
    }

    const { name, email, role } = JSON.parse(userInfo)

    dispatch(
      setUserAuthInfo({
        name,
        email,
        role,
        token,
      })
    )
  }

  // If authenticated, render the children components (dashboard layout)
  return children
}
export default AuthWapper

