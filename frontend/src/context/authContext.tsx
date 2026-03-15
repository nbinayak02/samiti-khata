import React, { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  token: string | null
  setUserLogIn: (token: string) => void
  setUserLogOut: () => void
}

const AuthContext = createContext<undefined | AuthContextType>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)

  console.log(
    "AuthContext: isAuthenticated =",
    isAuthenticated,
    "token =",
    token
  )

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
  }, [])

  const setUserLogIn = (token: string) => {
    localStorage.setItem("token", token)
    setToken(token)
    setIsAuthenticated(true)
  }

  const setUserLogOut = () => {
    localStorage.removeItem("token")
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, setUserLogIn, setUserLogOut }}
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
