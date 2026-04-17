import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/layouts/app-sidebar"
import { SiteHeader } from "@/components/layouts/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Suspense } from "react"
import LoaderComponent from "@/components/common/loader"

export default function DashboardLayout() {
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
          <Suspense fallback={<LoaderComponent />}>
            <Outlet />
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
