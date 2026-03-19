import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldError } from "@/components/ui/field"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"
import type { TUser } from "../../user.types"
import type { TOrganization } from "@/features/organization/organization.types"

interface ApproveDialogProps {
  user: TUser
  onClose: () => void
  title?: string
}

const ApproveDialog = ({ user, onClose, title = "Approve User" }: ApproveDialogProps) => {
  const [selectedOrg, setSelectedOrg] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)
  const organizations = useAppSelector((state) => state.organization.data) as
    | TOrganization[]
    | undefined

  const handleApprove = async () => {
    if (!selectedOrg) {
      setErrors("Please select an organization")
      return
    }

    setIsLoading(true)
    // TODO: Implement approval logic with API call
    console.log("Approving user:", user.id, "for organization:", selectedOrg)
    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1000)
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
            <p className="text-sm text-gray-600 mb-2">
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
            {isLoading ? (
              <Loader className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveDialog
