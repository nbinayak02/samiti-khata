"use client";
import { useEffect, useState } from "react";
import useAddUser from "../hooks/useAddAdmin";
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
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import ErrorBox from "@/components/error-box";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorField from "@/components/ui/error-field";

export default function AddAdminDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    isPending,
    isSuccess,
    addUser,
    serverError,
  } = useAddUser();

  useEffect(() => {
    if (isSuccess) setOpen(false);
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Enter details of User.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(addUser)}>
          {serverError && <ErrorBox message={serverError} />}
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Full Name"
                {...register("fullName")}
              />
              {errors?.fullName && (
                <ErrorField message={errors?.fullName?.message} />
              )}
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="user@email.com"
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
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="******"
                {...register("password")}
              />
              {errors?.password && (
                <ErrorField message={errors?.password?.message} />
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
