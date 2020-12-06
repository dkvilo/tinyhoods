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
				right={
					<div className="w-full mt-4">
						<div className="sticky" style={{ top: 20 }}>
							<div className="flex flex-col">
								<button
									onClick={() =>
										router.push("/?tab=feed", undefined, {
											shallow: true,
										})
									}
									className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
								>
									Home Page
								</button>
								{loginState.isLogin && (
									<button
										onClick={() =>
											router.push("/?tab=add-hood", undefined, {
												shallow: true,
											})
										}
										className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
									>
										Create Location
									</button>
								)}
								<p className="flex cursor-pointer items-center justify-center focus:outline-none rounded-full mb-2 p-1 bg-red-500 border-2 border-red-500 font-bold text-default">
									<Link href="/map">
										<span>Map</span>
									</Link>
								</p>
							</div>
							<div className="">
								<div className="mb-1 flex items-center">
									<Link href="/ads">
										<p className="cursor-pointer hover:text-primary text-default-inverted font-bold text-sm">
											Sponsored
										</p>
									</Link>
								</div>
								<div className="flex items-center justify-center border bg-secondary rounded-md w-full h-64"></div>
							</div>
						</div>
					</div>
				}
			/>
		</>
	);
}
