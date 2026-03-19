import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

import type { TBillIssuer } from "../user.types"
import BillIssuersTable from "./bill-issuers-table"
import CreateBillIssuerDialog from "./dialogs/create-bill-issuer-dialog"

const BillIssuerManagement = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Mock data - replace with Redux state later
  const mockBillIssuers: TBillIssuer[] = [
    {
      id: 1,
      name: "City Finance",
      address: "100 Main St",
      phone: "+1234567890",
      organizationId: 1,
      createdAt: "2026-01-15",
      updatedAt: "2026-01-15",
    },
    {
      id: 2,
      name: "State Revenue",
      address: "200 Oak Ave",
      phone: "+1234567891",
      organizationId: 1,
      createdAt: "2026-01-20",
      updatedAt: "2026-01-20",
    },
    {
      id: 3,
      name: "National Bills",
      address: "300 Pine Rd",
      phone: "+1234567892",
      organizationId: 2,
      createdAt: "2026-02-05",
      updatedAt: "2026-02-05",
    },
    {
      id: 4,
      name: "Local Registry",
      address: "400 Elm St",
      phone: "+1234567893",
      organizationId: 2,
      createdAt: "2026-02-10",
      updatedAt: "2026-02-10",
    },
  ]

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsCreateDialogOpen(true)}>
        <PlusCircle />
        Create Bill Issuer
      </Button>

      <BillIssuersTable billIssuers={mockBillIssuers} />

      {isCreateDialogOpen && (
        <CreateBillIssuerDialog onClose={() => setIsCreateDialogOpen(false)} />
      )}
    </div>
  )
}

export default BillIssuerManagement
