import { useEffect } from "react"
import { PageHeader } from "@/components/common/pageHeader"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import OrganizationTable from "@/features/organization/ui/organizationTable"
import {
  fetchOrganization,
  fetchUserAssignedOrganization,
} from "@/features/organization/organization.slice"
import { CreateOrganizationDialog } from "@/features/organization/ui/createOrganizationDialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import OrgProfileHeader from "@/features/organization/ui/org-profile-header"

const OrganizationPage = () => {
  const dispatch = useAppDispatch()
  const isFetchOrgIdle = useAppSelector(
    (state) => state.organization.status.fetch === "idle"
  )
  const role = useAppSelector((state) => state.auth.role)

  useEffect(() => {
    if (role === "OWNER") {
      dispatch(fetchOrganization())
    } else {
      dispatch(fetchUserAssignedOrganization())
    }
  }, [isFetchOrgIdle, dispatch, role])
  return (
    <>
      <PageHeader
        title="Organizations"
        description="Manage organizations here."
      />
      {role === "OWNER" ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              All Organizations
            </CardTitle>
            <CardDescription>Manage organizations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CreateOrganizationDialog />
            <OrganizationTable />
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8">
          <OrgProfileHeader />
        </div>
      )}
    </>
  )
}

export default OrganizationPage
