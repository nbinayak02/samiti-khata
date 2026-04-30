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
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader, PlusCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useCreateCommittee } from "../useCreateCommittee"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import type { TCreateCommittee } from "../schema"

export function CreateCommitteeDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    mutate,
    isPending,
  } = useCreateCommittee()

  const onSubmit = (data: TCreateCommittee) => {
    mutate(data, {
      onSuccess: () => {
        setIsOpen(false)
      },
    })
  }

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
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
