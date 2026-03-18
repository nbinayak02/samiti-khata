import { cn } from "@/lib/utils"
import { FcGoogle } from "react-icons/fc"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLoginForm } from "../hooks/useLoginForm"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { selectUserAuthInfo } from "../slice/authSlice"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate()
  const status = useAppSelector((state) => state.auth.status)
  const errorMessage = useAppSelector((state) => state.auth.errorMessage)
  const { name, email, role, token } = useAppSelector(selectUserAuthInfo)

  const {
    register,
    onSubmit,
    handleSubmit,
    formState: { errors },
  } = useLoginForm()

  useEffect(() => {
    if (status === "success" && token) {
      toast.success("Login successful!")
      localStorage.setItem("token", token)
      localStorage.setItem("userInfo", JSON.stringify({ name, email, role }))
      navigate("/dashboard")
    }

    if (status === "error" && errorMessage) {
      toast.error(errorMessage)
    }
  }, [status, token])

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
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
            {...register("email")}
            className="bg-background"
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
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
            {...register("password")}
            className="bg-background"
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
          <Button
            type="submit"
            className="text-md"
            disabled={status === "pending"}
          >
            {status === "pending" ? (
              <Loader className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          <FieldDescription className="px-6 text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
