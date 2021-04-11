import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import { UserTokenContext } from "../context";
import { isEmpty } from "ramda";

import Loader from "./Loader";
import UserListItem from "./UserListItem";

const GET_USERS = gql`
	query getUsers($data: GetUsersTokenAuthenticationInput!) {
		getUsers(data: $data) {
			name
			image
			avatar
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
				max: 5,
				token: loginState.token,
			},
		},
	});

	if (loading && !error) {
		return (
			<div className="bg-default rounded-lg">
				<Loader />
			</div>
		);
	}

	if (!loading && !error && isEmpty(data?.getUsers)) {
		return <div />;
	}

	return (
		<div className="flex flex-col w-full">
			{data?.getUsers &&
				data.getUsers.map((user: any) => (
					<UserListItem {...user} key={user.username} />
				))}
		</div>
	);
}

export default UsersList;
