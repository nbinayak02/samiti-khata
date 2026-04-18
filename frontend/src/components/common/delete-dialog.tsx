import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { FieldGroup } from "../ui/field"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"

type DeleteDialogProps = {
  onDelete: (isDeleteClicked: boolean, description: string) => void
}

const DeleteDialog = ({ onDelete }: DeleteDialogProps) => {
  const [description, setDescription] = useState("")

  const handleClick = () => {
    onDelete(true, description)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-rose-500/50">
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The data will be archived but not deleted and it will also not be
            counted in the report. Only admin will be able to see the archived
            data. Are you sure to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FieldGroup>
          <Label htmlFor="reasonToDelete">Description</Label>
          <Input
            id="reasonToDelete"
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
        </FieldGroup>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={description.length === 0}
            variant={"destructive"}
            onClick={handleClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
