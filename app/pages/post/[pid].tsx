import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../../client/screens/layout";
import { UserTokenContext } from "../../client/context";

import SEOHeader from "../../client/components/SEOHeader";
import EditUserProfileCard from "../../client/components/EditUserProfileCard";
import AuthCard from "../../client/components/AuthCard";
import Detailed from "../../client/components/post/Detailed";
import PostLoader from "../../client/components/PostLoader";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import RSidebar from "../../client/components/static/RSidebar";

export const GET_POST_BY_ID = gql`
	query getPost($id: ID!) {
		getPost(id: $id) {
			id
			author {
				username
				image
			}
			images {
				src
			}
			content
			publishedAt
		}
	}
`;

export default function () {
	const { state: loginState } = useContext<any>(UserTokenContext);
	const router = useRouter();

	const { loading, data, error } = useQuery(GET_POST_BY_ID, {
		variables: {
			id: router.query.pid,
		},
		fetchPolicy: "network-only",
	});

	return (
		<>
			<SEOHeader title="TinyHoods" description=" - Explore tiny world" />
			<Layout
				left={
					<div className="w-full mt-4">
						<div className="sticky" style={{ top: 20 }}>
							{loginState.isLogin ? <EditUserProfileCard /> : <AuthCard />}
						</div>
					</div>
				}
				center={
					<>
						{!loading && !error && data.getPost && (
							<Detailed {...data.getPost} onImageClick={(img) => {}} />
						)}

						{loading &&
							!error &&
							Array(1)
								.fill(0)
								.map((_, index) => (
									<div className="my-4" key={index}>
										<PostLoader index={index} />
									</div>
								))}
					</>
				}
				right={<RSidebar />}
			/>
		</>
	);
}
