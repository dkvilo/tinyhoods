import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Grid from "../client/components/Grid";
import SEOHeader from "../client/components/SEOHeader";
import UserProfileCard from "../client/components/UserProfileCard";
import React, { useContext, useEffect } from "react";
import Loader from "../client/components/Loader";
import Logo from "../client/components/Logo";
import Layout from "../client/screens/layout";
import RSidebar from "../client/components/static/RSidebar";
import LSidebar from "../client/components/static/LSidebar";
import { UserTokenContext } from "../client/context";
import Button from "../client/components/Button";

const GET_USER = gql`
	query getUser($username: String!, $token: String) {
		getUser(username: $username, token: $token) {
			username
			name
			avatar
			about
			image
			locationCount
			followersCount
			followingCount
			_following
			_editable
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
	const { state: loginState } = useContext(UserTokenContext);

	useEffect(() => {
		getUserInfo({
			variables: {
				token: loginState.isLogin ? loginState.token : "",
				username,
			},
		});
	}, [username, loginState]);

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
			{!loginState.isLogin && (
				<div className="p-4 shadow bg-green-400 fixed bottom-0 w-full z-30">
					<div className="container mx-auto flex items-center justify-center">
						{/* <img src="/logo.svg" width={32} height={32} className="mr-2" /> */}
						<p className="text-center text-lg">
							If you want to see more posts from{" "}
							<span className="font-bold text-2xl">@{username}</span>'s timeline
							<Button className="mx-1 font-bold bg-red-400 text-default rounded-md p-2 border-b-4 border-red-600 hover:bg-red-500 transition duration-150 easy-in-out focus:outline-none">
								Join Us Now
							</Button>
							and follow hundreds of other intreating people
						</p>
					</div>
				</div>
			)}
			<Layout
				left={<LSidebar />}
				right={<RSidebar />}
				center={
					<div className="h-full">
						<>
							{!loading && !error && data?.getUser && (
								<UserProfileCard data={data.getUser} />
							)}
						</>
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
