import { useState } from "react";
import { type SelectOption } from "./types";
import { useFieldContext } from "./index.tsx";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type ComboboxFieldProps = {
  label: string;
  options: SelectOption[];
  placeholder: string;
  search: string;
};

export const ComboboxField = ({
  label,
  options,
  placeholder,
  search,
}: ComboboxFieldProps) => {
  const field = useFieldContext<string>();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={field.name}>{label}</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {field.state.value
                ? options.find((option) => option.value === field.state.value)
                    ?.label
                : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
            <Command>
              <CommandInput placeholder={search} />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        // setValue(currentValue === option ? "" : currentValue)
                        field.handleChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.state.value === option.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
