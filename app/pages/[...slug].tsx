import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Grid from "../client/components/Grid";
import SEOHeader from "../client/components/SEOHeader";
import UserProfileCard from "../client/components/UserProfileCard";
import Link from "next/link";
import React, { useEffect } from "react";
import Loader from "../client/components/Loader";
import Logo from "../client/components/Logo";
import FeedFilterMenu from "../client/components/FeedFilterMenu";
import Layout from "../client/screens/layout";
import HeaderMenu from "../client/components/HeaderMenu";
import UsersList from "../client/components/UsersList";
import RSidebar from "../client/components/static/RSidebar";
import LSidebar from "../client/components/static/LSidebar";

const GET_USER = gql`
	query getUser($username: String!) {
		getUser(username: $username) {
			username
			name
			avatar
			about
			image
			locationCount
			followersCount
			followingCount
			followers {
				username
				avatar
				image
				name
			}
			following {
				username
				avatar
				image
				name
			}
			questionsCount
			questions {
				content
			}
			membership {
				isPaid
				expiresAt
				startedAt
			}
			link
			isPrivate
		}
	}
`;

function UserProfile({ username }: any) {
	const [getUserInfo, { loading, data, error }] = useLazyQuery(GET_USER);

	useEffect(() => {
		getUserInfo({
			variables: {
				username,
			},
		});
	}, [username]);

	if (loading && !error) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="my-1">
					<Logo size="big" />
				</div>
				<Loader />
			</div>
		);
	}

	if (!loading && error) {
		return (
			<Grid>
				<div className="m-5 p-4 rounded-md bg-default flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold text-default-inverted">404</h1>
					<p className="text-lg text-default-inverted">Not found</p>
					<img src="/404.svg" alt="not found" />
				</div>
			</Grid>
		);
	}

	return (
		<>
			<SEOHeader title={`${username}'s Profile`} description=" - Tinyhoods" />
			<Layout
				left={<LSidebar />}
				right={<RSidebar />}
				center={
					<div className="bg-default h-full shadow">
						<Grid>
							{!loading && !error && data?.getUser && (
								<UserProfileCard data={data.getUser} />
							)}
						</Grid>
					</div>
				}
			/>
		</>
	);
}

UserProfile.getInitialProps = async ({ query }: any) => {
	return { username: query.slug[0] };
};

export default UserProfile;
