import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { fetchUserAssignedOrganization } from "@/page/organization/organization.slice"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useEffect } from "react"

export function SiteHeader() {
  const dispatch = useAppDispatch()
  const isUserAssignedOrgFetchIdle = useAppSelector(
    (state) => state.organization.status.fetchUserAssigned === "idle"
  )
  const role = useAppSelector((state) => state.auth.role)
  const organizations = useAppSelector((state) => state.organization.data[0])

  useEffect(() => {
    if (role !== "OWNER") dispatch(fetchUserAssignedOrganization())
  }, [isUserAssignedOrgFetchIdle, dispatch])
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">
          {role === "OWNER" ? "Samiti Khata" : organizations?.name}
        </h1>
      </div>
    </header>
  )
}

