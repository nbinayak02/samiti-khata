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
import type { TBillIssuer } from "../../user/user.types"
import { Pencil, Trash2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import billIssuerRepository from "../billIssuer.repository"
import EditBillIssuerDialog from "./edit-bill-issuer-dialog"
import DeleteBillIssuerDialog from "./delete-bill-issuer-dialog"

const BillIssuersTable = () => {
  const { data } = useQuery({
    queryKey: ["billIssuers"],
    queryFn: billIssuerRepository.getBillIssuersByOrganization,
  })

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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((issuer, index: number) => (
                <TableRow key={issuer.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{issuer.name}</TableCell>
                  <TableCell>{issuer.address}</TableCell>
                  <TableCell>{issuer.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleActionClick("edit", issuer)}
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleActionClick("delete", issuer)}
                      >
                        <Trash2 className="h-4 w-4" />
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


