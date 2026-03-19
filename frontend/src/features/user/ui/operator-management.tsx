import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { TUser } from "../user.types"
import OperatorsTable from "./operators-table"

type TabStatus = "active" | "inactive" | "pending" | "suspended"

const OperatorManagement = () => {
  const [activeTab, setActiveTab] = useState<TabStatus>("pending")

  // Mock data - replace with Redux state later
  const mockOperators: Record<TabStatus, TUser[]> = {
    active: [
      {
        id: 5,
        fullName: "Sarah Thompson",
        email: "sarah@example.com",
        address: "147 Oak Lane",
        phoneNumber: "+1234567894",
        role: "OPERATOR",
        createdAt: "2026-01-20",
        updatedAt: "2026-01-20",
        status: "active",
      },
      {
        id: 6,
        fullName: "Michael Chen",
        email: "michael@example.com",
        address: "258 Maple Dr",
        phoneNumber: "+1234567895",
        role: "OPERATOR",
        createdAt: "2026-02-05",
        updatedAt: "2026-02-05",
        status: "active",
      },
    ],
    inactive: [
      {
        id: 7,
        fullName: "Emily Davis",
        email: "emily@example.com",
        address: "369 Cedar Ln",
        phoneNumber: "+1234567896",
        role: "OPERATOR",
        createdAt: "2026-01-15",
        updatedAt: "2026-01-15",
        status: "inactive",
      },
    ],
    pending: [
      {
        id: 8,
        fullName: "James Miller",
        email: "james@example.com",
        address: "471 Birch Ave",
        phoneNumber: "+1234567897",
        role: "OPERATOR",
        createdAt: "2026-03-16",
        updatedAt: "2026-03-16",
        status: "pending",
      },
    ],
    suspended: [
      {
        id: 9,
        fullName: "Jessica Garcia",
        email: "jessica@example.com",
        address: "582 Spruce St",
        phoneNumber: "+1234567898",
        role: "OPERATOR",
        createdAt: "2026-02-10",
        updatedAt: "2026-02-10",
        status: "suspended",
      },
    ],
  }

  return (
    <div className="space-y-6">
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
          <OperatorsTable operators={mockOperators.active} status="active" />
        </TabsContent>

        <TabsContent value="inactive" className="mt-2">
          <OperatorsTable
            operators={mockOperators.inactive}
            status="inactive"
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-2">
          <OperatorsTable operators={mockOperators.pending} status="pending" />
        </TabsContent>

        <TabsContent value="suspended" className="mt-2">
          <OperatorsTable
            operators={mockOperators.suspended}
            status="suspended"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OperatorManagement
