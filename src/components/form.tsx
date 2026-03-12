import { useAppForm } from "./form/index";
import { z } from "zod";
import { submit, type SubmitData } from "./form/actions";
import { useState } from "react";
import { Check, X } from "lucide-react";

const dataSchema = z.object({
  name: z.string(),
  cognome: z.string(),
  email: z.string().email(),
  phone: z.string(),
  body: z.string(),
  cf_turnstile_response: z.string(),
});
type DataType = z.infer<typeof dataSchema>;
const defaultData: DataType = {
  name: "",
  cognome: "",
  email: "",
  phone: "",
  body: "",
  cf_turnstile_response: "",
};

export default function ContactForm() {
  const [success, setSuccess] = useState<boolean | undefined>();
  const form = useAppForm({
    defaultValues: defaultData,
    validators: {
      onSubmit: dataSchema,
    },
    onSubmit: async ({ value }) => {
      const submitData: SubmitData = {
        data: {
          Nome: value.name,
          Cognome: value.cognome,
          Email: value.email,
          Telefono: value.phone,
          Informazioni: value.body,
        },
        options: {
          timestamp: new Date().toISOString(),
          form_id: "default_contact_form",
          documents: [],
          evidences: [],
        },
        token: value.cf_turnstile_response,
      };
      const response = await submit(submitData);
      if (response.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.AppField
          name="name"
          children={(field) => (
            <field.TextField label="Nome" placeholder="Enrico" />
          )}
        />
        <form.AppField
          name="cognome"
          children={(field) => (
            <field.TextField label="Cognome" placeholder="Rossi" />
          )}
        />
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField label="Email" placeholder="enrico@gmail.com" />
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.AppField
          name="phone"
          children={(field) => (
            <field.TextField label="Telefono" placeholder="+39 123 456 789" />
          )}
        />
      </div>
      <form.AppField
        name="body"
        children={(field) => (
          <field.TextField
            label="Richiesta"
            placeholder="Vorrei un preventivo..."
          />
        )}
      />
      <form.AppField
        name="cf_turnstile_response"
        children={(field) => <field.Turnstile />}
      />
      <form.AppForm>
        <form.SubmitButton>Invia</form.SubmitButton>
      </form.AppForm>
      {success !== undefined && success === true && (
        <div className="bg-green-100 p-4 rounded-2xl flex flex-col text-center items-center gap-4">
          <Check className="text-green-500 h-4 w-4" />
          <span>La richiesta e' stata inviata con successo.</span>
        </div>
      )}
      {success !== undefined && success === false && (
        <div className="bg-red-100 p-4 rounded-2xl flex flex-col text-center items-center gap-4">
          <X className="text-red-500 h-4 w-4" />
          <span>Errore nell'invio della richiesta. Riprova piu' tardi.</span>
        </div>
      )}
    </form>
  );
}
