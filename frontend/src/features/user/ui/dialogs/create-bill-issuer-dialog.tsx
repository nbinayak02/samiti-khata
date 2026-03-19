import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldError } from "@/components/ui/field"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"
import type { TOrganization } from "@/features/organization/organization.types"

interface CreateBillIssuerDialogProps {
  onClose: () => void
}

const CreateBillIssuerDialog = ({ onClose }: CreateBillIssuerDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    organizationId: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const organizations = useAppSelector((state) => state.organization.data) as
    | TOrganization[]
    | undefined

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    }
    if (!formData.organizationId) {
      newErrors.organizationId = "Organization is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreate = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    // TODO: Implement create logic with API call
    console.log("Creating bill issuer with data:", formData)
    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Bill Issuer</DialogTitle>
          <DialogDescription>
            Add a new bill issuer to the system
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Field>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Enter bill issuer name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) setErrors({ ...errors, name: "" })
              }}
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>

          <Field>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value })
                if (errors.address) setErrors({ ...errors, address: "" })
              }}
            />
            {errors.address && <FieldError>{errors.address}</FieldError>}
          </Field>

          <Field>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value })
                if (errors.phone) setErrors({ ...errors, phone: "" })
              }}
            />
            {errors.phone && <FieldError>{errors.phone}</FieldError>}
          </Field>

          <Field>
            <Label htmlFor="organization">Organization *</Label>
            <Select
              value={formData.organizationId}
              onValueChange={(value) => {
                setFormData({ ...formData, organizationId: value })
                if (errors.organizationId)
                  setErrors({ ...errors, organizationId: "" })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Organizations</SelectLabel>
                  {organizations && organizations.length > 0 ? (
                    organizations.map((org) => (
                      <SelectItem key={org.id} value={String(org.id)}>
                        {org.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-gray-500">
                      No organizations available
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.organizationId && (
              <FieldError>{errors.organizationId}</FieldError>
            )}
          </Field>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBillIssuerDialog
