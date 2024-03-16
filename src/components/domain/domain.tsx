import { component$, $, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import type { DomainProps } from "~/routes";

function isValidDomain(domain: string): boolean {
  if (domain === "") {
    return true;
  }
  const domainRegex =
    /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.([A-Za-z]{2,6})(\.[A-Za-z]{2,6})?$/;
  return domainRegex.test(domain);
}

export const Domain = component$<DomainProps>(({ action }) => {
  const isDomainCorrect = useSignal(true);
  const isEmptyDomain = useSignal(true);

  const handleInputChange = $((_: Event, element: HTMLInputElement) => {
    const value = element.value;
    if (value === "") {
      isEmptyDomain.value = true;
    } else {
      isEmptyDomain.value = false;
    }

    isDomainCorrect.value = isValidDomain(value);
  });

  return (
    <div>
      <Form action={action}>
        <div class="flex items-center justify-center gap-2">
          <label class="input input-sm input-bordered flex items-center gap-2">
            Domain
            <input
              name="domain"
              type="text"
              class="grow"
              placeholder="site.com"
              onInput$={handleInputChange}
              disabled={action.isRunning}
            />
          </label>
          <button
            class="btn btn-outline btn-primary btn-sm w-20"
            disabled={
              action.isRunning || !isDomainCorrect.value || isEmptyDomain.value
            }
            type="submit"
          >
            {action.isRunning ? (
              <span class="loading-spin loading loading-sm"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>

        {!isDomainCorrect.value && (
          <div class="text-sm text-error">Input a valid domain name</div>
        )}
      </Form>
    </div>
  );
});
