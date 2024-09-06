/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Bun HTTP server when building for production.
 *
 * Learn more about the Bun integration here:
 * - https://qwik.builder.io/docs/deployments/bun/
 * - https://bun.sh/docs/api/http
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/bun";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";
import render from "./entry.ssr";

// Create the Qwik City Bun middleware
const { router, notFound, staticFile } = createQwikCity({
	render,
	qwikCityPlan,
	manifest,
});

// Allow for dynamic port
// biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: <explanation>
const port = Number(Bun.env.PORT ?? 3000);

/* eslint-disable */
console.log(`Server started: http://localhost:${port}/`);

// biome-ignore lint/correctness/noInvalidUseBeforeDeclaration: <explanation>
Bun.serve({
	async fetch(request: Request) {
		// Server-side render this request with Qwik City
		const qwikCityResponse = await router(request);
		if (qwikCityResponse) {
			return qwikCityResponse;
		}

		const staticResponse = await staticFile(request);
		if (staticResponse) {
			return staticResponse;
		}

		// Path not found
		return notFound(request);
	},
	port,
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
declare const Bun: any;
