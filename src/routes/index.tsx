import { component$ } from "@builder.io/qwik";
import type { ActionStore, JSONValue } from "@builder.io/qwik-city";
import { routeAction$, type DocumentHead } from "@builder.io/qwik-city";
import { Domain } from "~/components/domain/domain";
import { Navbar } from "~/components/navbar/navbar";
import { Result } from "~/components/result/result";

export const useDomainDiscoverAction = routeAction$(async (domainInput) => {
  console.log("domain", domainInput);
  return {
    success: true,
    user: domainInput["domain"],
  };
});

export type DomainProps = {
  action: ActionStore<
    { success: boolean; user: JSONValue },
    Record<string, unknown>,
    true
  >;
};

export default component$(() => {
  const action = useDomainDiscoverAction();
  return (
    <Navbar>
      <Domain q:slot="domain" action={action} />
      <Result q:slot="result" action={action} />
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
