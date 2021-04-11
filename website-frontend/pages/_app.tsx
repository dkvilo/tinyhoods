import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/react-hooks";

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
import { useApollo } from "../libs/apolloClient";

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

const App = ({ Component, pageProps }: any) => {
	const apolloClient = useApollo(pageProps);

	return (
		<ApolloProvider client={apolloClient}>
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

export default App;
