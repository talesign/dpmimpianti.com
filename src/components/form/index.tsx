import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

import { TextField } from "./text-field";
import { CheckboxField } from "./checkbox-field";
import { SubmitButton } from "./submit-button";
import { ComboboxField } from "./combobox-field";
// import { DateField } from "./date-field";
import { SelectFieldAlt } from "./select-field-alt";
import Turnstile from "./turnstile";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    CheckboxField,
    ComboboxField,
    SelectFieldAlt,
    // DateField,
    Turnstile,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
