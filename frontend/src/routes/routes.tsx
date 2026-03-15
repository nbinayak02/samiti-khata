import LoginPage from "@/page/auth/login"
import SignupPage from "@/page/auth/signup"
import RootLayout from "@/layouts/rootLayout"
import AuthLayout from "@/layouts/authLayout"
import Dashboard from "@/page/dashboard/dashboard"
import ErrorPage from "@/page/errorPage/errorPage"
import LandingPage from "@/page/landing/landingPage"
import DashboardLayout from "@/layouts/dashboardLayout"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
])

export default router
