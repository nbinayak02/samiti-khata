"use client";
import { Button } from "@/components/ui/button";
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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle } from "lucide-react";
import useAddOrganization from "../hooks/useAddOrganization";
import ErrorField from "@/components/ui/error-field";
import { useEffect, useState } from "react";
import ErrorBox from "@/components/errors/error-box";

export default function AddOrganizationDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    isPending,
    isSuccess,
    addOrganization,
    serverError,
  } = useAddOrganization();

  useEffect(() => {
    if (isSuccess) setOpen(false);
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Organization</DialogTitle>
          <DialogDescription>Enter details of organization.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(addOrganization)}>
          {serverError && <ErrorBox message={serverError} />}
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                placeholder="Organization Name"
                {...register("name")}
              />
              {errors?.name && <ErrorField message={errors?.name?.message} />}
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="organization@email.com"
                {...register("email")}
              />
              {errors?.email && <ErrorField message={errors?.email?.message} />}
            </Field>
            <Field>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Address"
                {...register("address")}
              />
              {errors?.address && (
                <ErrorField message={errors?.address?.message} />
              )}
            </Field>
            <Field>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="98xxxxxxxx"
                {...register("phoneNumber")}
              />
              {errors?.phoneNumber && (
                <ErrorField message={errors?.phoneNumber?.message} />
              )}
            </Field>
          </FieldGroup>
          <DialogFooter className="pt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? (
                <div>
                  <Loader2 className="animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <span>Save Organization</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
