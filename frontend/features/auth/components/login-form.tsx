"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import useLogin from "@/features/auth/hooks/useLogin";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    onSubmit,
    handleSubmit,
    formState: { errors },
    serverError,
    loading,
    success,
  } = useLogin();

  const router = useRouter();

  useEffect(() => {
    if (success) {
      console.log("Use effect run with success true");
      router.refresh();
      setTimeout(() => {
        console.log("Routing...");
        // router.replace("/dashboard");
        window.location.assign("/dashboard");
      }, 100);
    }
  }, [success, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Samiti Khata account
                </p>
                {serverError && <FieldError>{serverError}</FieldError>}
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors?.email && (
                  <FieldError>{errors?.email?.message}</FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors?.password && (
                  <FieldError>{errors?.password?.message}</FieldError>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="flex flex-row gap-3">
                      <Loader2 className="animate-spin" />
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    <>Login</>
                  )}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link href={"/request-access"}>Request access</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-primary md:flex flex-row justify-center items-center">
            {/* <Image
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            /> */}
            <p className="text-2xl font-medium">Welcome to Samiti Khata!</p>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
