import LoginPage from "@/page/auth/loginPage"
import SignupPage from "@/page/auth/signupPage"
import RootLayout from "@/layouts/rootLayout"
import AuthLayout from "@/layouts/authLayout"
import Dashboard from "@/page/dashboard/dashboard"
import ErrorPage from "@/page/errorPage/errorPage"
import LandingPage from "@/page/landing/landingPage"
import DashboardLayout from "@/layouts/dashboardLayout"
import { createBrowserRouter } from "react-router-dom"
import ProfilePage from "@/page/dashboard/profile"
import OrganizationPage from "@/page/organization/organizationPage"
import CommitteePage from "@/page/committee/committee"
import UsersPage from "@/page/users/users"
import AuthWapper from "@/layouts/authWrapper"
import IncomePage from "@/page/income/income"
import CategoryPage from "@/page/category/category"
import ExpensePage from "@/page/expense/expense"
import ReportsPage from "@/page/reports/reportPage"

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

