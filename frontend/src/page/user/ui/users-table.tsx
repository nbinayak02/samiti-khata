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

interface UsersTableProps {
  users: TUser[]
  status: "pending" | "approved"
}

const UsersTable = ({ users, status }: UsersTableProps) => {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null)
  const [dialogType, setDialogType] = useState<
    "approve" | "suspend" | "toggle" | "delete" | null
  >(null)

  const handleActionClick = (
    type: "approve" | "suspend" | "toggle" | "delete",
    user: TUser
  ) => {
    setSelectedUser(user)
    setDialogType(type)
  }

  const closeDialog = () => {
    setSelectedUser(null)
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
            {users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(
                        user.userOrganizations[0]?.status ?? "pending"
                      )}
                    >
                      {user.userOrganizations[0]?.status ?? "PENDING"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleActionClick("approve", user)}
                          >
                            <Check />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleActionClick("delete", user)}
                          >
                            <Trash />
                            Delete
                          </Button>
                        </>
                      )}
                      {status === "approved" && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleActionClick("toggle", user)}
                          >
                            Deactivate
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleActionClick("suspend", user)}
                          >
                            Suspend
                          </Button>
                        </>
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
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedUser && dialogType === "approve" && (
        <ApproveDialog user={selectedUser} onClose={closeDialog} />
      )}
      {selectedUser && dialogType === "suspend" && (
        <SuspendDialog user={selectedUser} onClose={closeDialog} />
      )}
      {selectedUser && dialogType === "toggle" && (
        <StatusToggleDialog user={selectedUser} onClose={closeDialog} />
      )}
    </>
  )
}

export default UsersTable

