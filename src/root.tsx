import { component$ } from "@builder.io/qwik";
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import { ToastStack } from "qwik-toasts";

import "./global.css";
import { ThemeScript } from "qwik-theme-toggle";

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	return (
		<QwikCityProvider>
			<head>
				<meta charSet="utf-8" />
				<link rel="manifest" href="/manifest.json" />
				<RouterHead />
				<ThemeScript themeStorageKey="theme" />
			</head>
			<body lang="en" class="font-inter tracking-tight antialiased">
				<ToastStack horizontally="toast-end" vertically="toast-top">
					<RouterOutlet />
					<ServiceWorkerRegister />
				</ToastStack>
			</body>
		</QwikCityProvider>
	);
});
