import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { TUser } from "../user.types"
import UsersTable from "./users-table"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { fetchUsers } from "../user.slice"

type TabStatus = "active" | "inactive" | "pending" | "suspended"

const AdminManagement = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<TabStatus>("pending")
  const admins = useAppSelector((state) => state.user.data)
  const status = useAppSelector((state) => state.user.status)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers())
    }
  }, [status])

  // Mock data - replace with Redux state later
  const mockUsers: Record<TabStatus, TUser[]> = {
    active: [
      {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
        address: "123 Main St",
        phoneNumber: "+1234567890",
        role: "ADMIN",
        createdAt: "2026-01-15",
        updatedAt: "2026-01-15",
        status: "active",
      },
    ],
    inactive: [
      {
        id: 2,
        fullName: "Jane Smith",
        email: "jane@example.com",
        address: "456 Oak Ave",
        phoneNumber: "+1234567891",
        role: "OPERATOR",
        createdAt: "2026-01-10",
        updatedAt: "2026-01-10",
        status: "inactive",
      },
    ],
    pending: [
      {
        id: 3,
        fullName: "Bob Wilson",
        email: "bob@example.com",
        address: "789 Pine Rd",
        phoneNumber: "+1234567892",
        role: "OPERATOR",
        createdAt: "2026-03-17",
        updatedAt: "2026-03-17",
        status: "pending",
      },
    ],
    suspended: [
      {
        id: 4,
        fullName: "Alice Brown",
        email: "alice@example.com",
        address: "321 Elm St",
        phoneNumber: "+1234567893",
        role: "ADMIN",
        createdAt: "2026-02-20",
        updatedAt: "2026-02-20",
        status: "suspended",
      },
    ],
  }

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabStatus)}
      >
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-2">
          <UsersTable users={mockUsers.active} status="active" />
        </TabsContent>

        <TabsContent value="inactive" className="mt-2">
          <UsersTable users={mockUsers.inactive} status="inactive" />
        </TabsContent>

        <TabsContent value="pending" className="mt-2">
          <UsersTable users={admins} status="pending" />
        </TabsContent>

        <TabsContent value="suspended" className="mt-2">
          <UsersTable users={mockUsers.suspended} status="suspended" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminManagement
