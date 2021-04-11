import React from "react";
import SEOHeader from "../client/components/SEOHeader";

import { initializeApollo, addApolloState } from "../libs/apolloClient";

export async function getStaticProps() {
	const apolloClient = initializeApollo();
	return addApolloState(apolloClient, {
		props: {},
	});
}

export default function Ads() {
	return (
		<>
			<div className="flex container mx-auto">
				<SEOHeader title="TinyHoods" description=" - Advertisement" />
				<h1>Ads</h1>
			</div>
		</>
	);
}
