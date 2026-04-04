import { Controller } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type SelectFormProps = {
  control: any
  name: string
  options: any[]
  label: string
  placeholder?: string
  disabled?: boolean
  defaultValue?: string
}

const SelectForm = ({
  control,
  name,
  options,
  label,
  placeholder,
  disabled,
  defaultValue,
}: SelectFormProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          disabled={disabled}
          defaultValue={defaultValue || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map((option: any) => (
                <SelectItem key={option.id} value={String(option.id)}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  )
}

export default SelectForm
