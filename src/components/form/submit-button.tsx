import { useStore } from "@tanstack/react-form";
import { useFormContext } from "./index.tsx";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button
      type="submit"
      disabled={isSubmitting || !canSubmit}
      className="rounded-md bg-sky-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
    >
      {children}
      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
        <ArrowRight className="w-4 h-4" />
      </div>
    </Button>
  );
};
