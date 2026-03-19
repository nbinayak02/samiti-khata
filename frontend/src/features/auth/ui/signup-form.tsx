import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import { useSignupForm } from "../hooks/useSignupForm"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"

type Roles = "ADMIN" | "OPERATOR"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    onSubmit,
    loading,
    formState: { errors },
  } = useSignupForm()

  const [activeTab, setActiveTab] = useState<Roles>("OPERATOR")

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel>Sign up as</FieldLabel>
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value) => setActiveTab(value as Roles)}
          >
            <TabsList>
              <TabsTrigger value="OPERATOR">Operator</TabsTrigger>
              <TabsTrigger value="ADMIN" className="w-60">
                Admin
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Input type="hidden" value={activeTab} {...register("role")} />
        </Field>
        <Separator />
        <Field>
          <Button variant="outline" type="button">
            <FcGoogle className="size-4" />
            Continue with Google
          </Button>
          <FieldSeparator className="mt-4">or</FieldSeparator>
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="bg-background"
            {...register("fullName")}
          />
          {errors.fullName && (
            <FieldError>{errors.fullName.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Input
            id="address"
            type="text"
            placeholder="123 Main St, City, Country"
            className="bg-background"
            {...register("address")}
          />
          {errors.address && <FieldError>{errors.address.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
          <Input
            id="phoneNumber"
            type="text"
            placeholder="9800000000"
            className="bg-background"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <FieldError>{errors.phoneNumber.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="bg-background"
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <div className="flex flex-row justify-between gap-3">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              className="bg-background"
              {...register("password")}
            />
            {errors.password ? (
              <FieldError>{errors.password.message}</FieldError>
            ) : (
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              className="bg-background"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <FieldError>{errors.confirmPassword.message}</FieldError>
            ) : (
              <FieldDescription>Please confirm your password.</FieldDescription>
            )}
          </Field>
        </div>

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Create Account"}
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Log in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
