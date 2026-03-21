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
import type { TBillIssuer } from "../../user.types"
import type { TOrganization } from "@/features/organization/organization.types"

interface EditBillIssuerDialogProps {
  billIssuer: TBillIssuer
  onClose: () => void
}

const EditBillIssuerDialog = ({
  billIssuer,
  onClose,
}: EditBillIssuerDialogProps) => {
  const [formData, setFormData] = useState({
    name: billIssuer.name,
    address: billIssuer.address,
    phone: billIssuer.phone,
    organizationId: String(billIssuer.organizationId),
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

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    // TODO: Implement edit logic with API call
    console.log("Updating bill issuer:", billIssuer.id, "Data:", formData)
    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Bill Issuer</DialogTitle>
          <DialogDescription>
            Update the details of the bill issuer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Field>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
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
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate-spin mr-2 h-4 w-4" />
            ) : null}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditBillIssuerDialog
