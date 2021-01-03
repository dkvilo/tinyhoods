import React from "react";
import { useRouter } from "next/router";

import Layout from "../../client/screens/layout";
import SEOHeader from "../../client/components/SEOHeader";
import Detailed from "../../client/components/post/Detailed";
import PostLoader from "../../client/components/PostLoader";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import RSidebar from "../../client/components/static/RSidebar";
import LSidebar from "../../client/components/static/LSidebar";
import MobileMenu from "../../client/components/MobileMenu";

export const GET_POST_BY_ID = gql`
	query getPost($id: ID!) {
		getPost(id: $id) {
			id
			author {
				username
				image
				avatar
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
				left={<LSidebar />}
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
				mobile={<MobileMenu />}
			/>
		</>
	);
}
