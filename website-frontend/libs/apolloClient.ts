import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: any;

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: new HttpLink({
			uri: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/graphql`, // Server URL (must be absolute)
			credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
		}),
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						allPosts: concatPagination(),
					},
				},
			},
		}),
	});
}

export function initializeApollo(initialState: any = null) {
	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		const data = merge(initialState, existingCache);

		// Restore the cache with the merged data
		_apolloClient.cache.restore(data);
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === "undefined") return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return pageProps;
}

export function useApollo(pageProps: any) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(() => initializeApollo(state), [state]);
	return store;
}
