"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { InputField } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import useAddFiscalYear from "../hooks/useAddFiscalYear";

export function AddFiscalYearDialog() {
  const {
    control,
    serverError,
    isPending,
    isError,
    handleSubmit,
    onSubmit,
    isSuccess,
  } = useAddFiscalYear();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!isSuccess) return;
    setOpen(false);
  }, [isSuccess]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add New Fiscal Year
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Fiscal Year</DialogTitle>
            <DialogDescription>
              Create fiscal year. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          {isError && <p>{serverError?.message}</p>}
          <FieldGroup className="mt-4">
            <InputField
              control={control}
              label="Starting Date (B.S.)"
              name="startDateBs"
              isRequired
              placeholder="2083-04-01"
            />
            <InputField
              control={control}
              label="Ending Date (B.S.)"
              name="endDateBs"
              isRequired
              placeholder="2084-03-32"
            />
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex flex-row gap-3">
                  <Loader2 />
                  Saving...
                </div>
              ) : (
                <>Save Fiscal Year</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
