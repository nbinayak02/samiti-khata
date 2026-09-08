import { Button } from "@/components/ui/button"
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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DemoCredentialsDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link">View Demo Credentials</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Samiti Khata Demo Credentials</DialogTitle>
            <DialogDescription>
             Use these credentials to login for demo purposes.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Email</Label>
              <p>skadmin@gmail.com</p>
            </Field>
            <Field>
              <Label htmlFor="username-1">Password</Label>
                          <p>skadmin123</p>

            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
