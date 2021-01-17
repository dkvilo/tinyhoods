import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../client/screens/layout";
import SEOHeader from "../../client/components/SEOHeader";
import Detailed from "../../client/components/post/Detailed";
import PostLoader from "../../client/components/PostLoader";

import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import RSidebar from "../../client/components/static/RSidebar";
import LSidebar from "../../client/components/static/LSidebar";
import MobileMenu from "../../client/components/MobileMenu";
import { UserTokenContext } from "../../client/context";
import Loader from "../../client/components/comment/Loader";
import EmptyCard from "../../client/components/EmptyCard";

export const GET_POST_BY_ID = gql`
	query getPost($data: GetSinglePostInput!) {
		getPost(data: $data) {
			id
			likesCount
			commentsCount
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
			_liked
			_editable
		}
	}
`;

export default function PostDetailed() {
	const router = useRouter();

	const { state: loginState } = useContext(UserTokenContext);

	const [getPost, { loading, data, error }] = useLazyQuery(GET_POST_BY_ID);

	useEffect(() => {
		if (router.query?.pid) {
			getPost({
				variables: {
					data: {
						id: router.query.pid,
						token: loginState.token,
					},
				},
			});
		}
	}, [router.query]);

	if (!router.query?.pid) {
		return <Loader />;
	}

	return (
		<>
			<SEOHeader title="TinyHoods" description=" - Explore tiny world" />
			<Layout
				left={<LSidebar />}
				center={
					<>
						{!loading && !error && data?.getPost && (
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

						{!loading && (error || !data?.getPost) && (
							<div className="my-5">
								<EmptyCard message="The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct" />
							</div>
						)}
					</>
				}
				right={<RSidebar />}
				mobile={<MobileMenu />}
			/>
		</>
	);
}
