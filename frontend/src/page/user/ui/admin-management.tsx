import UsersTable from "./users-table"
import type { TUser } from "../user.types"
import { useEffect, useState } from "react"
import { fetchAllAdmins } from "../user.slice"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TabStatus = "pending" | "assigned"

const AdminManagement = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<TabStatus>("pending")
  const admins = useAppSelector((state) => state.user.users)
  const isFetchAdminIdle = useAppSelector(
    (state) => state.user.status.fetchAllAdmin === "idle"
  )
  const approvalStatus = useAppSelector(
    (state) => state.user.status.approveAdmin
  )

  useEffect(() => {
    dispatch(fetchAllAdmins())
  }, [isFetchAdminIdle, approvalStatus, dispatch])

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabStatus)}
      >
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="assigned">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-2">
          <UsersTable
            users={admins.filter(
              (admin: TUser) => admin.userOrganizations.length === 0
            )}
            status="pending"
          />
        </TabsContent>

        <TabsContent value="assigned" className="mt-2">
          <UsersTable
            users={admins.filter(
              (admin: TUser) => admin.userOrganizations.length > 0
            )}
            status="approved"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminManagement



