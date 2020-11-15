import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import ApolloClient, { InMemoryCache } from "apollo-boost";

import withApollo from "../libs";

import {
	UserTokenContextProvider,
	GQLErrorContextProvider,
	LoaderProgressContextProvider,
	FiltersContextProvider,
	AlertMessageContextProvider,
} from "../client/context";

import AlertMessageContainer from "../client/components/AlertMessageContainer";

import "rc-slider/assets/index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/main.css";

const ErrorContainerCSR = dynamic(
	() =>
		import("../client/components/ErrorContainer").then(
			(mod) => mod.default
		) as any,
	{
		ssr: false,
	}
) as any;

const LoaderContainerCSR = dynamic(
	() =>
		import("../client/components/LoaderContainer").then(
			(mod) => mod.default
		) as any,
	{
		ssr: false,
	}
) as any;

const App = ({ Component, pageProps, apollo }: any) => {
	return (
		<ApolloProvider client={apollo}>
			<LoaderProgressContextProvider>
				<AlertMessageContextProvider>
					<GQLErrorContextProvider>
						<UserTokenContextProvider>
							<FiltersContextProvider>
								<>
									<LoaderContainerCSR />
									<AlertMessageContainer />
									<ErrorContainerCSR />
									<Component {...pageProps} />
								</>
							</FiltersContextProvider>
						</UserTokenContextProvider>
					</GQLErrorContextProvider>
				</AlertMessageContextProvider>
			</LoaderProgressContextProvider>
		</ApolloProvider>
	);
};

export default withApollo(
	({ initialState }: any) =>
		new ApolloClient({
			uri: `${(process.env as any).app.domain}/api/graphql`,
			cache: new InMemoryCache().restore(initialState || {}),
		}),
	{ getDataFromTree }
)(App);
