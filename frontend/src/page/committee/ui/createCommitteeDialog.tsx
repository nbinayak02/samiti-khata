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
import { useCreateCommittee } from "../useCreateCommittee"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { toast } from "sonner"

export function CreateCommitteeDialog() {
  const status = useAppSelector((state) => state.committee.status)
  const errorMessage = useAppSelector((state) => state.committee.errorMessage)

  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    onSubmit,
  } = useCreateCommittee()

  useEffect(() => {
    if (status === "failed" || status === "succeeded") setIsOpen(false)
    if (status === "failed" && errorMessage) toast.error(errorMessage)
  }, [status, errorMessage])

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
          <DialogTitle>Create Committee</DialogTitle>
          <DialogDescription>
            Enter the details of the new committee here. Click create when you
            are done.
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
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && (
                <FieldError>{errors.description.message}</FieldError>
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


