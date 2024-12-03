import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { HiXCircleSolid } from "@qwikest/icons/heroicons";
import { Domain } from "~/components/domain/domain";
import { Navbar } from "~/components/navbar/navbar";
import { Result } from "~/components/result/result";
import { useDomainDiscoverAction } from "./layout";

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
				<div q:slot="result" class="alert alert-error mt-8">
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
