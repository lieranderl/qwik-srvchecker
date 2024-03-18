import { component$ } from "@builder.io/qwik";
import type { ActionStore } from "@builder.io/qwik-city";
import { routeAction$, type DocumentHead } from "@builder.io/qwik-city";
import { Domain } from "~/components/domain/domain";
import { Navbar } from "~/components/navbar/navbar";
import { Result } from "~/components/result/result";
import type { CheckResult } from "~/models/result";
import { HiXCircleSolid } from "@qwikest/icons/heroicons";

export const getUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "";
  }
  return "http://127.0.0.1:8080/srv_process";
};

export const useDomainDiscoverAction = routeAction$(async (domainInput) => {
  const url = getUrl();
  const jsonData = JSON.stringify(domainInput);
  const fetchOptions: RequestInit = {
    method: "POST", // Set the method to POST
    headers: {
      "Content-Type": "application/json", // Set the Content-Type header to application/json
    },
    body: jsonData, // Set the body of the request to the JSON data
  };
  try {
    // Perform the fetch call with the url and options
    const response = await fetch(url, fetchOptions);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body and return it
    const res: CheckResult = await response.json();
    return {
      success: true,
      result: res,
      error: "",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        result: null,
        error: error.message,
      };
    }
    return {
      success: false,
      result: null,
      error: "Error during fetching result",
    };
  }
});

export type DomainProps = {
  action: ActionStore<
    | { success: boolean; result: CheckResult | null; error: string }
    | { success: boolean; result: {}; error: string },
    Record<string, unknown>,
    true
  >;
};

export default component$(() => {
  const action = useDomainDiscoverAction();

  return (
    <Navbar>
      <Domain q:slot="domain" action={action} />
      {!action.isRunning &&
        action.value &&
        action.value.success &&
        action.value.result != null && (
          <Result q:slot="result" result={action.value.result} />
        )}
      {action.value && !action.value.success && (
        <div q:slot="result" role="alert" class="alert alert-error mt-8">
          <HiXCircleSolid class="text-3xl" />
          <span>{action.value.error}</span>
        </div>
      )}
    </Navbar>
  );
});

export const head: DocumentHead = {
  title: "Srv Checker",
  meta: [
    {
      name: "description",
      content: "Srv Checker",
    },
  ],
};
