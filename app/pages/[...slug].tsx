import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Grid from "../client/components/Grid";
import SEOHeader from "../client/components/SEOHeader";
import { useRouter } from "next/dist/client/router";
import UserProfileCard from "../client/components/UserProfileCard";
import Link from "next/link";

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

export default function UserProfile() {
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
				<div className="m-5 p-4 rounded-md bg-default flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold text-default-inverted">404</h1>
					<p className="text-lg text-default-inverted">Not found</p>
					<img src="/404.svg" alt="not found" />
				</div>
			</Grid>
		);
	}

	return (
		<div className=" w-full h-screen overflow-x-scroll">
			<SEOHeader title={`${slug[0]}'s Profile`} description=" - Tinyhoods" />
			<div className="sticky top-0 p-2 flex items-center justify-start w-full">
				<Link href="/">
					<p className="text-primary p-2 bg-secondary-soft rounded-full">
						Home
					</p>
				</Link>
			</div>
			<Grid>
				{!loading && !error && data?.getUser && (
					<UserProfileCard data={data.getUser} />
				)}
			</Grid>
		</div>
	);
}
