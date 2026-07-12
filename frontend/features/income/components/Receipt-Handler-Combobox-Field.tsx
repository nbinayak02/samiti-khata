import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type ComboboxFieldProps<
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
> = {
  control: Control<TFieldValues, unknown, TTransformValues>;
  name: Path<TFieldValues>;
  label: string;
  isRequired: boolean;
};
export default function ReceiptHandlerComboboxField<
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
>({
  control,
  label,
  name,
  isRequired = true,
}: ComboboxFieldProps<TFieldValues, TTransformValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>
            {label}
            {isRequired && <span className="text-rose-500">*</span>}
          </FieldLabel>
          <Combobox>
            <ComboboxInput placeholder={`Select ${label}`} name={field.name} />
            <ComboboxContent>
              <ComboboxEmpty>No {label.toLowerCase()} found.</ComboboxEmpty>
              <ComboboxList>
                {[].map((d, index) => (
                  <ComboboxItem key={index} value={index}>
                    <Item size="xs" className="p-0">
                      <ItemContent>
                        <ItemTitle className="whitespace-nowrap"></ItemTitle>
                        <ItemDescription></ItemDescription>
                      </ItemContent>
                    </Item>
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
