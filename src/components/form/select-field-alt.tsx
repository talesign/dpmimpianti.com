import { useFieldContext } from "./index.tsx";
import { type SelectOption } from "./types";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FieldErrors } from "./field-errors";

type SelectFieldProps = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
};

export const SelectFieldAlt = ({
  label,
  options,
  placeholder,
}: SelectFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={field.name}>{label}</Label>
        <Select
          value={field.state.value}
          onValueChange={(value) => field.handleChange(value)}
        >
          <SelectTrigger
            id={field.name}
            onBlur={field.handleBlur}
            className="w-full"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
