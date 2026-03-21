import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OperatorsTable from "./operators-table"
import { useQuery } from "@tanstack/react-query"
import { userRepository } from "../user.repository"
import type { TUser } from "../user.types"

type TabStatus = "active" | "inactive" | "pending" | "suspended"

const OperatorManagement = () => {
  const { data: operators } = useQuery({
    queryKey: ["operators"],
    queryFn: userRepository.fetchAllOperators,
  })

  const [activeTab, setActiveTab] = useState<TabStatus>("pending")

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
          <OperatorsTable
            operators={
              operators
                ? operators.filter(
                    (operator:TUser) =>
                      operator.userOrganizations[0]?.status === "ACTIVE"
                  )
                : []
            }
            status="active"
          />
        </TabsContent>

        <TabsContent value="inactive" className="mt-2">
          <OperatorsTable
            operators={
              operators
                ? operators.filter(
                    (operator) =>
                      operator.userOrganizations[0]?.status === "INACTIVE"
                  )
                : []
            }
            status="inactive"
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-2">
          <OperatorsTable
            operators={
              operators
                ? operators.filter(
                    (operator) => operator.userOrganizations.length === 0
                  )
                : []
            }
            status="pending"
          />
        </TabsContent>

        <TabsContent value="suspended" className="mt-2">
          <OperatorsTable
            operators={
              operators
                ? operators.filter(
                    (operator) =>
                      operator.userOrganizations[0]?.status === "SUSPENDED"
                  )
                : []
            }
            status="suspended"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OperatorManagement
