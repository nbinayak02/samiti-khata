import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import type { TUser } from "../../user.types"
import { approveAdmin } from "../../user.slice"
import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { fetchOrganization } from "@/features/organization/organization.slice"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ApproveDialogProps {
  user: TUser
  onClose: () => void
  title?: string
}

const ApproveDialog = ({
  user,
  onClose,
  title = "Approve Admin",
}: ApproveDialogProps) => {
  const [selectedOrg, setSelectedOrg] = useState<string>("")
  const [errors, setErrors] = useState<string | null>(null)

  // to fetch organizations for dropdown if not already fetched
  const organizations = useAppSelector((state) => state.organization.data)
  const organizationStatus = useAppSelector(
    (state) => state.organization.status
  )

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(
    (state) => state.user.status.approveAdmin === "loading"
  )
  const approveStatus = useAppSelector(
    (state) => state.user.status.approveAdmin
  )

  // close dialog on successful approval
  useEffect(() => {
    if (approveStatus === "succeeded" || approveStatus === "failed") {
      onClose()
    }
  }, [approveStatus, onClose])

  // fetch organizations if not already fetched
  useEffect(() => {
    if (organizationStatus === "idle") {
      dispatch(fetchOrganization())
    }
  }, [organizationStatus])

  // make approve request
  const handleApprove = async () => {
    if (!selectedOrg) {
      setErrors("Please select an organization")
      return
    }

    dispatch(
      approveAdmin({ userId: user.id, organizationId: Number(selectedOrg) })
    )
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Approve {user.fullName} and assign to an organization
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-medium">User:</span> {user.fullName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>

          <Field>
            <Label htmlFor="organization">Organization *</Label>
            <Select value={selectedOrg} onValueChange={setSelectedOrg}>
              <SelectTrigger>
                <SelectValue placeholder="Select an organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Organizations</SelectLabel>
                  {organizations && organizations.length > 0 ? (
                    organizations.map((org) => (
                      <SelectItem key={org.id} value={String(org.id)}>
                        {org.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-gray-500">
                      No organizations available
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors && <FieldError>{errors}</FieldError>}
          </Field>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleApprove}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveDialog
