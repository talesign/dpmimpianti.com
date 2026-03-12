export type SubmitData = {
  data: any; // Form data to save
  options: ConsentOptions;
  token: string; // Cloudflare tokne
};

type ConsentOptions = {
  form_id: string;
  timestamp: string;
  evidences: ConsentEvidence[];
  documents: ConsentDocument[];
};

type ConsentEvidence = {
  given: boolean;
  method: "checkbox_unticked_by_default";
  purpose_statement_text: string;
  ui_language_code: string;
};

type ConsentDocument = {
  name: string;
  url: string;
  purpose_statement_text: string;
  ui_language_code: string;
};

export const submit = async ({ data, options, token }: SubmitData) => {
  try {
    const response = await fetch(
      `${import.meta.env.PUBLIC_DEUS_URL}/form/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data,
          context: {
            browser_language:
              navigator.language ||
              (navigator.languages && navigator.languages[0]),
            url: window.location.href,
            document_referrer: document.referrer,
            user_agent: navigator.userAgent,
          },
          consent: options,
          cf_turnstile_response: token,
          project: import.meta.env.PUBLIC_PROJECT_ID,
        }),
      },
    );

    if (response.ok) {
      // Status in the range 200-299
      // Try to parse JSON, but handle cases where response might be empty
      let responseData = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          responseData = await response.json();
        } catch (e) {
          // If body is empty or not valid JSON, but status is ok
          console.warn("Response was ok but could not parse JSON body:", e);
        }
      }
      return { success: true, status: response.status, data: responseData };
    } else {
      // Handle non-ok responses (e.g., 400, 403, 500)
      let errorData = `Request failed with status ${response.status}`;
      try {
        const errorJson = await response.json();
        errorData =
          errorJson.message || errorJson.error || JSON.stringify(errorJson);
      } catch (e) {
        // If error response is not JSON or empty
        const textError = await response.text();
        if (textError) {
          errorData = textError;
        }
      }
      return { success: false, status: response.status, error: errorData };
    }
  } catch (error) {
    // Handle network errors or other exceptions during fetch
    console.error("Submission fetch error:", error);
    return {
      success: false,
      status: 0, // Or some other indicator of a client-side/network error
      error:
        error instanceof Error
          ? error.message
          : "An unknown network error occurred",
    };
  }
};
