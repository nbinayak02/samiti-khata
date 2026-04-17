import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

import RootLayout from "@/layouts/rootLayout"
import AuthLayout from "@/layouts/authLayout"
import AuthWapper from "@/layouts/authWrapper"
import LandingPage from "@/page/landing/landingPage"
import DashboardLayout from "@/layouts/dashboardLayout"

const LoginPage = lazy(() => import("@/page/auth/loginPage"))
const SignupPage = lazy(() => import("@/page/auth/signupPage"))
const Dashboard = lazy(() => import("@/page/dashboard/dashboard"))
const ProfilePage = lazy(() => import("@/page/dashboard/profile"))
const OrganizationPage = lazy(
  () => import("@/page/organization/organizationPage")
)
const CommitteePage = lazy(() => import("@/page/committee/committee"))
const UsersPage = lazy(() => import("@/page/users/users"))
const IncomePage = lazy(() => import("@/page/income/income"))
const CategoryPage = lazy(() => import("@/page/category/category"))
const ExpensePage = lazy(() => import("@/page/expense/expense"))
const ReportsPage = lazy(() => import("@/page/reports/reportPage"))
const ErrorPage = lazy(() => import("@/page/errorPage/errorPage"))

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
        element: (
          <AuthWapper>
            <DashboardLayout />
          </AuthWapper>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "organization", element: <OrganizationPage /> },
          { path: "committee", element: <CommitteePage /> },
          { path: "income", element: <IncomePage /> },
          { path: "expense", element: <ExpensePage /> },
          { path: "users", element: <UsersPage /> },
          { path: "categories", element: <CategoryPage /> },
          { path: "reports", element: <ReportsPage /> },
          { path: "account/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
])

export default router
