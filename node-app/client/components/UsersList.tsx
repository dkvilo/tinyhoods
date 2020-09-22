import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import { UserTokenContext } from "../context";
import { isEmpty } from "ramda";

import Loader from "./Loader";
import EmptyCard from "./EmptyCard";
import UserListItem from "./UserListItem";

const GET_USERS = gql`
	query getUsers($data: TokenAuthenticationInput!) {
		getUsers(data: $data) {
			name
			username
			following {
				username
			}
			followers {
				username
			}
			_following
		}
	}
`;

function UsersList(): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);

	const { loading, data, error } = useQuery(GET_USERS, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				token: loginState.token,
			},
		},
	});

	if (loading && !error) {
		return (
			<div className="p-2 bg-default rounded-lg mb-4">
				<Loader />
			</div>
		);
	}

	if (!loading && !error && isEmpty(data?.getUsers)) {
		return <EmptyCard />;
	}

	return (
		<>
			{data?.getUsers &&
				data.getUsers.map((user: any) => (
					<UserListItem {...user} key={user.username} />
				))}
		</>
	);
}

export default UsersList;
