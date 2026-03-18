import { useEffect } from "react"
import { PageHeader } from "@/components/common/pageHeader"
import { useAppDispatch } from "@/hooks/typeSafeReduxHooks"
import OrganizationTable from "@/features/organization/ui/organizationTable"
import { fetchOrganization } from "@/features/organization/organization.slice"
import { CreateOrganizationDialog } from "@/features/organization/ui/createOrganizationDialog"

const OrganizationPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrganization())
  }, [])
  return (
    <>
      <PageHeader
        title="Organizations"
        description="Manage organizations here."
      />
      <div className="mt-8">
        <CreateOrganizationDialog />
      </div>
      <div className="mt-8">
        <h3 className="text-md font-bold">All Organizations</h3>
        <OrganizationTable />
      </div>
    </>
  )
}

export default OrganizationPage
