import { useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { PageHeader } from "@/components/common/pageHeader"
import AdminManagement from "@/features/user/ui/admin-management"
import OperatorManagement from "@/features/user/ui/operator-management"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BillIssuerManagement from "@/features/bill-issuer/ui/bill-issuer-management"

type UserTab = "operators" | "billIssuers"

const UsersPage = () => {
  const role = useAppSelector((state) => state.auth.role)
  const [activeTab, setActiveTab] = useState<UserTab>("operators")
  return (
    <>
      <PageHeader title="Users" description="Manage users here." />

      <div className="mt-8 space-y-8">
        {role === "OWNER" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Admins</CardTitle>
              <CardDescription>Manage admin accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminManagement />
            </CardContent>
          </Card>
        )}

        {role === "ADMIN" && (
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as UserTab)}
          >
            <TabsList>
              <TabsTrigger value="operators">Operators</TabsTrigger>
              <TabsTrigger value="billIssuers">Bill Issuers</TabsTrigger>
            </TabsList>

            <TabsContent value="operators" className="mt-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Operators</CardTitle>
                  <CardDescription>Manage operator accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <OperatorManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billIssuers" className="mt-2">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Bill Issuers
                  </CardTitle>
                  <CardDescription>Manage bill issuer accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <BillIssuerManagement />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </>
  )
}

export default UsersPage
