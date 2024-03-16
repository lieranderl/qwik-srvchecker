import { component$ } from "@builder.io/qwik";
import type { ActionStore } from "@builder.io/qwik-city";
import { routeAction$, type DocumentHead } from "@builder.io/qwik-city";
import { Domain } from "~/components/domain/domain";
import { Navbar } from "~/components/navbar/navbar";
import { Result } from "~/components/result/result";
import type { CheckResult } from "~/models/result";

export const useDomainDiscoverAction = routeAction$(async (domainInput) => {
  
  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  console.log("domain", domainInput);
  await sleep(2000);
  const res: CheckResult = {
    code: 200,
    connectivity: [],
    srv: [],
    elapsedTime: "22222",
  };

  return {
    success: true,
    result: res,
  };
});

export type DomainProps = {
  action: ActionStore<
    { success: boolean; result: CheckResult },
    Record<string, unknown>,
    true
  >;
};

export default component$(() => {
  const action = useDomainDiscoverAction();

  return (
    <Navbar>
      <Domain q:slot="domain" action={action} />
      {action.value && action.value.success && (
        <Result q:slot="result" result={action.value.result} />
      )}
    </Navbar>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
