import { useState } from "react";
import dynamic from "next/dynamic";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Grid from "../client/components/Grid";
import SEOHeader from "../client/components/SEOHeader";
import { useRouter } from "next/dist/client/router";
import UserProfileCard from "../client/components/UserProfileCard";

const GET_USER = gql`
	query getUser($username: String!) {
		getUser(username: $username) {
			username
			name
			avatar
			about
			link
			isPrivate
		}
	}
`;

const HeaderCSR = dynamic(
	() => import("../client/components/Header").then((mod) => mod.default) as any,
	{
		ssr: false,
	}
) as any;

export default function Home() {
	const router = useRouter();
	const slug = router.query.slug || [];

	const { loading, data, error } = useQuery(GET_USER, {
		fetchPolicy: "network-only",
		variables: {
			username: slug[0],
		},
	});

	if (!loading && error) {
		return (
			<Grid>
				<div className="m-5 p-4 rounded-md shadow-md bg-default flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold text-default-inverted">404</h1>
					<p className="text-lg text-default-inverted">User not found</p>
				</div>
			</Grid>
		);
	}

	return (
		<div className=" w-full h-screen overflow-x-scroll">
			<SEOHeader title={`${slug[0]}'s Profile`} description=" - Tinyhoods" />
			<Grid>
				{!loading && !error && data?.getUser && (
					<UserProfileCard data={data.getUser} />
				)}
			</Grid>
		</div>
	);
}
