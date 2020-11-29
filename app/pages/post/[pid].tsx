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
					<div className="sticky top-0 rounded w-auto">
						{loginState.isLogin ? <EditUserProfileCard /> : <AuthCard />}
					</div>
				}
				center={
					<>
						<div className="hidden xs:hidden sm:hidden md:hidden lg:block xl:block w-full bg-default px-2">
							<div className="flex flex-col flex-wrap -mx-3">
								<div>
									<Link href="/">
										<span className="px-2 cursor-pointer pt-3 pb-2 text-default-inverted text-2xl font-bold">
											Go back
										</span>
									</Link>
								</div>
							</div>
						</div>

						{!loading && !error && data.getPost && (
							<Detailed {...data.getPost} onImageClick={(img) => {}} />
						)}

						{loading &&
							!error &&
							Array(1)
								.fill(0)
								.map((_, index) => <PostLoader key={index} index={index} />)}
					</>
				}
				right={
					<div className="sticky top-0 rounded w-auto">
						<div className="flex flex-col p-4 mt-1">
							<button
								onClick={() =>
									router.push("/?tab=feed", undefined, {
										shallow: true,
									})
								}
								className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
							>
								Feed
							</button>
							{loginState.isLogin && (
								<button
									onClick={() =>
										router.push("/?tab=add-hood", undefined, { shallow: true })
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

						<div className="px-4 mb-4">
							<div className="mb-1 flex items-center">
								<Link href="/ads">
									<p className="cursor-pointer hover:text-primary text-default-inverted font-bold text-sm">
										Sponsored
									</p>
								</Link>
							</div>
							<div className="flex items-center justify-center bg-secondary rounded-md w-full h-64"></div>
						</div>
					</div>
				}
			/>
		</>
	);
}
