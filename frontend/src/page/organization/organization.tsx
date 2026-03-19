import { useEffect } from "react"
import { PageHeader } from "@/components/common/pageHeader"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import OrganizationTable from "@/features/organization/ui/organizationTable"
import { fetchOrganization } from "@/features/organization/organization.slice"
import { CreateOrganizationDialog } from "@/features/organization/ui/createOrganizationDialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const OrganizationPage = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.organization.status)
  const role = useAppSelector((state) => state.auth.role)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrganization())
    }
  }, [])
  return (
    <>
      <PageHeader
        title="Organizations"
        description="Manage organizations here."
      />
      {role === "OWNER" && (
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
      )}
    </>
  )
}

export default OrganizationPage
