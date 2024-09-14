import { Slot, component$ } from '@builder.io/qwik';
import { type RequestHandler, routeAction$, routeLoader$ } from '@builder.io/qwik-city';
import { CheckResult } from '~/models/result';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const getUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.API_URL ?? '';
  }
  return 'https://europe-west1-srvchecker-collab.cloudfunctions.net/svrprocess-service';
};

export const useQuery = routeLoader$(({ query }) => {
  if (query) {
    const domain_param = query.get('domain');
    const filter = query.get('filter');
    return {
      domain: domain_param ?? '',
      filter: filter ?? '',
    };
  }
  return { domain: '', filter: '' };
});
export const useDomainDiscoverAction = routeAction$(async (domainInput) => {
  const url = getUrl();
  const jsonData = JSON.stringify(domainInput);
  const fetchOptions: RequestInit = {
    method: 'POST', // Set the method to POST
    headers: {
      'Content-Type': 'application/json', // Set the Content-Type header to application/json
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
      error: '',
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
      error: 'Error during fetching result',
    };
  }
});

export default component$(() => {
  return <Slot />;
});
