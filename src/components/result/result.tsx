import { component$ } from "@builder.io/qwik";
import type { DomainProps } from "~/routes";

export const Result = component$<DomainProps>(({ action }) => {
  return (
    <>
      Result:
      {action.value && action.value.success && (
        <p>{action.value.user.toString()}</p>
      )}
    </>
  );
});
