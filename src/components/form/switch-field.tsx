import { Label } from "../ui/label";
import { useFieldContext } from "./index.tsx";
import { Switch } from "../ui/switch";
import { FieldErrors } from "./field-errors";

type SwitchFieldProps = {
  label: string;
};

export const SwitchField = ({ label }: SwitchFieldProps) => {
  const field = useFieldContext<boolean>();
  return (
    <div className="space-y-2">
      <div className="flex w-full justify-between space-y-1">
        <Label htmlFor={field.name}>{label}</Label>
        <Switch
          checked={field.state.value}
          onCheckedChange={(value) => field.handleChange(value)}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
