import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { fetchOrganization } from "./organization.slice"
import OrganizationTable from "./ui/organizationTable"
import { CreateOrganizationDialog } from "./ui/createOrganizationDialog"
import OrgProfileHeader from "./ui/org-profile-header"

export default function OrganizationPage() {
  const dispatch = useAppDispatch()
  const userRole = useAppSelector((state) => state.auth.role)
  useEffect(() => {
    dispatch(fetchOrganization())
  }, [dispatch])

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
        <OrgProfileHeader />
        {userRole === "owner" && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Organizations</h1>
              <CreateOrganizationDialog />
            </div>
            <OrganizationTable />
          </>
        )}
      </div>
    </div>
  )
}
