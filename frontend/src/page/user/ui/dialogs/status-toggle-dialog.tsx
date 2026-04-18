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
import { Textarea } from "@/components/ui/textarea"
import { Loader } from "lucide-react"
import { Field, FieldError } from "@/components/ui/field"
import type { TUser } from "../../user.types"

interface StatusToggleDialogProps {
  user: TUser
  onClose: () => void
  title?: string
}

const StatusToggleDialog = ({ user, onClose, title = "Update Status" }: StatusToggleDialogProps) => {
  const [reason, setReason] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)

  const isActivating = user.status !== "active"
  const actionLabel = isActivating ? "Activate" : "Deactivate"
  const reasonLabel = isActivating
    ? "Reason for Activation"
    : "Reason for Deactivation"

  const handleToggleStatus = async () => {
    if (!reason.trim()) {
      setErrors(`Please provide a reason for ${actionLabel.toLowerCase()}`)
      return
    }

    setIsLoading(true)
    // TODO: Implement status toggle logic with API call
    // console.log(`${actionLabel} user:`, user.id, "Reason:", reason)
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
            {actionLabel} {user.fullName} account. Please provide a reason.
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
            <p className="text-sm text-gray-600">
              <span className="font-medium">Current Status:</span>{" "}
              <span className="capitalize">{user.status}</span>
            </p>
          </div>

          <Field>
            <Label htmlFor="reason">{reasonLabel} *</Label>
            <Textarea
              id="reason"
              placeholder={`Enter the reason for ${actionLabel.toLowerCase()}...`}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                setErrors(null)
              }}
              className="min-h-24 resize-none"
            />
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
            onClick={handleToggleStatus}
            disabled={isLoading}
            variant={isActivating ? "default" : "destructive"}
          >
            {isLoading ? (
              <Loader className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default StatusToggleDialog
