import { Navigate, Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { AppSidebar } from "@/components/layouts/app-sidebar"
import { SiteHeader } from "@/components/layouts/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { setUserAuthInfo } from "@/features/auth/slice/authSlice"

export default function DashboardLayout() {
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

  // If authenticated, render the dashboard layout
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="px-10 py-5">
          <Outlet />
        </div>
        {/* <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <DataTable data={data} /> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </SidebarInset>
    </SidebarProvider>
  )
}
