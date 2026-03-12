import React from "react";
import { useFieldContext } from "./index.tsx";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";

type TextFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({ label, ...inputProps }: TextFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={field.name}>{label}</Label>
        <Input
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600"
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
