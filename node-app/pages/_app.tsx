import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import ApolloClient, { InMemoryCache } from "apollo-boost";

import withApollo from "../libs";

import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/main.css";

const App = ({ Component, pageProps, apollo }: any) => (
	<ApolloProvider client={apollo}>
		<Component {...pageProps} />
	</ApolloProvider>
);

export default withApollo(
	({ initialState }) =>
		new ApolloClient({
			uri: `${(process.env as any).app.domain}/api/graphql`,
			cache: new InMemoryCache().restore(initialState || {}),
		}),
	{ getDataFromTree }
)(App);
