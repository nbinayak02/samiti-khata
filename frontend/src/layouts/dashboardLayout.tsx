import { AppSidebar } from "@/components/layouts/app-sidebar"
import { SiteHeader } from "@/components/layouts/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useAuth } from "@/context/authContext"
import { Navigate, Outlet } from "react-router-dom"

export default function DashboardLayout() {
  // Check if the user is authenticated
  const { isAuthenticated } = useAuth()

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
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
        <Outlet />
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
        {/* </div> */} */
      </SidebarInset>
    </SidebarProvider>
  )
}
