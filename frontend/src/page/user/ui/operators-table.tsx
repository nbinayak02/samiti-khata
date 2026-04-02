import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TUser } from "../user.types"
import ApproveDialog from "./dialogs/approve-dialog"
import SuspendDialog from "./dialogs/suspend-dialog"
import StatusToggleDialog from "./dialogs/status-toggle-dialog"
import { Check, Trash } from "lucide-react"
import getStatusColor from "../getStatusColor"

type TabStatus = "active" | "inactive" | "pending" | "suspended"

interface OperatorsTableProps {
  operators: TUser[]
  status: TabStatus
}

const OperatorsTable = ({ operators, status }: OperatorsTableProps) => {
  const [selectedOperator, setSelectedOperator] = useState<TUser | null>(null)
  const [dialogType, setDialogType] = useState<
    "approve" | "suspend" | "toggle" | "delete" | null
  >(null)

  const handleActionClick = (
    type: "approve" | "suspend" | "toggle" | "delete",
    operator: TUser
  ) => {
    setSelectedOperator(operator)
    setDialogType(type)
  }

  const closeDialog = () => {
    setSelectedOperator(null)
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
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operators.length > 0 ? (
              operators.map((operator, index) => (
                <TableRow key={operator.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{operator.fullName}</TableCell>
                  <TableCell>{operator.address}</TableCell>
                  <TableCell>{operator.email}</TableCell>
                  <TableCell>{operator.phoneNumber}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(operator.status)}>
                      {operator.status || status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() =>
                              handleActionClick("approve", operator)
                            }
                          >
                            <Check />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleActionClick("delete", operator)
                            }
                          >
                            <Trash />
                            Delete
                          </Button>
                        </>
                      )}
                      {status === "active" && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleActionClick("toggle", operator)
                            }
                          >
                            Deactivate
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleActionClick("suspend", operator)
                            }
                          >
                            Suspend
                          </Button>
                        </>
                      )}
                      {status === "inactive" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleActionClick("toggle", operator)
                          }
                        >
                          Activate
                        </Button>
                      )}
                      {status === "suspended" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleActionClick("toggle", operator)
                          }
                        >
                          Reactivate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-gray-500"
                >
                  No operators found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedOperator && dialogType === "approve" && (
        <ApproveDialog
          user={selectedOperator}
          onClose={closeDialog}
          title="Approve Operator"
        />
      )}
      {selectedOperator && dialogType === "suspend" && (
        <SuspendDialog
          user={selectedOperator}
          onClose={closeDialog}
          title="Suspend Operator"
        />
      )}
      {selectedOperator && dialogType === "toggle" && (
        <StatusToggleDialog
          user={selectedOperator}
          onClose={closeDialog}
          title="Update Operator Status"
        />
      )}
    </>
  )
}

export default OperatorsTable


