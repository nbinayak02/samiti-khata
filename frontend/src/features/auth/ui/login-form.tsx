import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Login to access your account.
          </p>
        </div>

        <Field>
          <Button variant="outline" type="button">
            <FcGoogle className="size-4" />
            Continue with Google
          </Button>
          <FieldSeparator className="mt-4">or</FieldSeparator>
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className="text-md">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-md">
              Password
            </FieldLabel>
            <FieldLabel className="underline">Forgot Password</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
          />
          <FieldDescription>
            Must be at least 6 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit" className="text-md">
            Login
          </Button>
          <FieldDescription className="px-6 text-center">
            Don't have an account? <a href="#">Sign Up</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
