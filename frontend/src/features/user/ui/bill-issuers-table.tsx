import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { TBillIssuer } from "../user.types"
import { Pencil, Trash2 } from "lucide-react"
import EditBillIssuerDialog from "./dialogs/edit-bill-issuer-dialog"
import DeleteBillIssuerDialog from "./dialogs/delete-bill-issuer-dialog"

interface BillIssuersTableProps {
  billIssuers: TBillIssuer[]
}

const BillIssuersTable = ({ billIssuers }: BillIssuersTableProps) => {
  const [selectedBillIssuer, setSelectedBillIssuer] =
    useState<TBillIssuer | null>(null)
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null)

  const handleActionClick = (type: "edit" | "delete", issuer: TBillIssuer) => {
    setSelectedBillIssuer(issuer)
    setDialogType(type)
  }

  const closeDialog = () => {
    setSelectedBillIssuer(null)
    setDialogType(null)
  }

  return (
    <>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billIssuers.length > 0 ? (
              billIssuers.map((issuer, index) => (
                <TableRow key={issuer.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{issuer.name}</TableCell>
                  <TableCell>{issuer.address}</TableCell>
                  <TableCell>{issuer.phone}</TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      Organization #{issuer.organizationId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleActionClick("edit", issuer)}
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleActionClick("delete", issuer)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-gray-500"
                >
                  No bill issuers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedBillIssuer && dialogType === "edit" && (
        <EditBillIssuerDialog
          billIssuer={selectedBillIssuer}
          onClose={closeDialog}
        />
      )}
      {selectedBillIssuer && dialogType === "delete" && (
        <DeleteBillIssuerDialog
          billIssuer={selectedBillIssuer}
          onClose={closeDialog}
        />
      )}
    </>
  )
}

export default BillIssuersTable
