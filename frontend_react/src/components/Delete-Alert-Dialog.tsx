import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  modifyReasonSchema,
  type ModifyReasonSchema,
} from "@/schema/reason.schema";
import { SubmitButton, TextAreaField } from "./shared/form";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  message: string;
  id: number;
  isPending: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: SubmitHandler<ModifyReasonSchema>;
};

export function DeleteAlertDialog({
  id,
  onSubmit,
  message,
  isPending,
  open,
  setOpen,
}: Props) {
  console.log("ID is: ", id);
  const form = useForm({
    resolver: zodResolver(modifyReasonSchema),
    defaultValues: {
      description: "",
      id,
    },
  });

  console.log(form.formState.errors);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <TextAreaField
              control={form.control}
              isRequired={true}
              label="Reason to delete"
              name="description"
            />
          </FieldGroup>
          <DialogFooter className="mt-5">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <SubmitButton
              variant={"destructive"}
              isPending={isPending}
              label="Delete"
              labelWhenPending="Deleting"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
