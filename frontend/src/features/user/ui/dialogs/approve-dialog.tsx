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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userRepository } from "../../user.repository"
import { toast } from "sonner"

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
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: userRepository.approveOperator,
    onSuccess: () => {
      toast.success("Operator approved successfully")
      queryClient.invalidateQueries({ queryKey: ["operators"] })
    },
  })

  // close dialog on successful approval
  useEffect(() => {
    if (isSuccess || isError) onClose()
  }, [isSuccess, isError])

  // make approve request
  const handleApprove = async () => {
    mutate(user.id)
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
          <p className="text-md">Do you want to approve following user?</p>
          <div>
            <p className="mb-2 text-sm">
              <span className="font-medium">User:</span> {user.fullName}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleApprove}
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveDialog
