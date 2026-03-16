import React, { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  token: string | null
  userInfo: UserInfo
  setUserLogIn: (token: string, userInfo: UserInfo) => void
  setUserLogOut: () => void
}

type UserInfo = {
  name: string
  email: string
  role: string
}

const AuthContext = createContext<undefined | AuthContextType>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const fakeUserInfo: UserInfo = {
    name: "",
    email: "",
    role: "",
  }
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo>(fakeUserInfo)

  console.log(
    "AuthContext: isAuthenticated =",
    isAuthenticated,
    "token =",
    token,
    "userInfo =",
    userInfo
  )

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUserInfo = localStorage.getItem("userInfo")
    if (storedToken && storedUserInfo) {
      setToken(storedToken)
      setUserInfo(JSON.parse(storedUserInfo))
      setIsAuthenticated(true)
    }
  }, [])

  const setUserLogIn = (token: string, userInfo: UserInfo) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    setToken(token)
    setUserInfo(userInfo)
    setIsAuthenticated(true)
  }

  const setUserLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userInfo")
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, userInfo, setUserLogIn, setUserLogOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
