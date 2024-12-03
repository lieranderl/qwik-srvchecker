import { $, component$, useSignal } from "@builder.io/qwik";
import { type ActionStore, Form } from "@builder.io/qwik-city";
import type { CheckResult } from "~/models/result";
import { useQuery } from "~/routes/layout";
import { isValidDomain, urlUpdateQueries } from "~/utils/functions";

export type DomainProps = {
	action: ActionStore<
		| { success: boolean; result: CheckResult | null; error: string }
		| { success: boolean; result: unknown; error: string },
		Record<string, unknown>,
		true
	>;
};

export const Domain = component$<DomainProps>(({ action }) => {
	const queries = useQuery();
	const currentDomain = useSignal(queries.value.domain);
	const isDomainCorrect = useSignal(isValidDomain(queries.value.domain));
	const isEmptyDomain = useSignal(queries.value.domain === "");
	const handleInputChange = $((_: Event, element: HTMLInputElement) => {
		currentDomain.value = element.value;
		isEmptyDomain.value = false;
		if (currentDomain.value === "") {
			isEmptyDomain.value = true;
		}
		isDomainCorrect.value = isValidDomain(currentDomain.value);
	});

	return (
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
						value={currentDomain.value}
					/>
				</label>
				<button
					class="btn btn-outline btn-primary btn-sm w-20"
					disabled={
						action.isRunning || !isDomainCorrect.value || isEmptyDomain.value
					}
					type="submit"
					onClick$={() => {
						urlUpdateQueries("domain", currentDomain.value);
					}}
				>
					{action.isRunning ? (
						<span class="loading-spin loading loading-sm" />
					) : (
						"Submit"
					)}
				</button>
			</div>

			{!isDomainCorrect.value && (
				<div class="text-sm text-error">Input a valid domain name</div>
			)}
		</Form>
	);
});
