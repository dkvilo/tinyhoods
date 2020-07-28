import { useContext } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import ApolloClient, { InMemoryCache } from "apollo-boost";

import withApollo from "../libs";

import {
	UserTokenContextProvider,
	GQLErrorContextProvider,
	LoaderProgressContextProvider,
	LoaderProgressContext,
	GQLErrorContext,
} from "../client/context";

import InlineLoader from "../client/components/InlineLoader";

import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/main.css";
import GQLError from "../client/components/GQLError";

const App = ({ Component, pageProps, apollo }: any) => {
	const { state: loaderState } = useContext<any>(LoaderProgressContext);
	const { state: errorState } = useContext<any>(GQLErrorContext);

	return (
		<ApolloProvider client={apollo}>
			<LoaderProgressContextProvider>
				<GQLErrorContextProvider>
					<UserTokenContextProvider>
						<>
							{loaderState?.loading && loaderState.loading && (
								<div
									style={{
										zIndex: 8888,
										position: "absolute",
										top: 0,
										width: "100%",
									}}
								>
									<InlineLoader />
								</div>
							)}
							{errorState?.hasError && (
								<GQLError title={errorState.title} error={errorState.error} />
							)}
							<Component {...pageProps} />
						</>
					</UserTokenContextProvider>
				</GQLErrorContextProvider>
			</LoaderProgressContextProvider>
		</ApolloProvider>
	);
};

export default withApollo(
	({ initialState }) =>
		new ApolloClient({
			uri: `${(process.env as any).app.domain}/api/graphql`,
			cache: new InMemoryCache().restore(initialState || {}),
		}),
	{ getDataFromTree }
)(App);
