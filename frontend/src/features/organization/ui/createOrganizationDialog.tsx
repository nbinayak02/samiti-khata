import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader, PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { toast } from "sonner"
import useCreateOrganization from "../useCreateOrganization"
import { resetStatusAndErrorMessage } from "../organization.slice"

export function CreateOrganizationDialog() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.organization.status)
  const errorMessage = useAppSelector(
    (state) => state.organization.errorMessage
  )
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    onSubmit,
  } = useCreateOrganization()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Enter the details of the new organization here. Click create when
            you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>
            <Field>
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} />
              {errors.address && (
                <FieldError>{errors.address.message}</FieldError>
              )}
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
            <Field>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" {...register("phoneNumber")} />
              {errors.phoneNumber && (
                <FieldError>{errors.phoneNumber.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={status === "loading"}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <Loader className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
