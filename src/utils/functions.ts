export const urlUpdateQueries = (name: string, value: string) => {
	const url = new URL(window.location.href);
	url.searchParams.set(name, value);
	window.history.pushState({}, "", url);
};

export function isValidDomain(domain: string): boolean {
	if (domain === "") {
		return true;
	}
	const domainRegex =
		/^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
	return domainRegex.test(domain);
}
