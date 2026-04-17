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
import { Loader } from "lucide-react"
import type { TBillIssuer } from "../../user/user.types"

interface DeleteBillIssuerDialogProps {
  billIssuer: TBillIssuer
  onClose: () => void
}

const DeleteBillIssuerDialog = ({
  billIssuer,
  onClose,
}: DeleteBillIssuerDialogProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    // TODO: Implement delete logic with API call
    // console.log("Deleting bill issuer:", billIssuer.id)
    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Bill Issuer</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this bill issuer? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Name:</span> {billIssuer.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span> {billIssuer.phone}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Address:</span> {billIssuer.address}
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading ? (
              <Loader className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBillIssuerDialog
