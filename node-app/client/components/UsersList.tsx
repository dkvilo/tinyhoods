import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import { UserTokenContext } from "../context";
import { isEmpty } from "ramda";
import Button from "./Button";
import Loader from "./Loader";
import EmptyCard from "./EmptyCard";

const GET_USERS = gql`
	query getUsers($data: TokenAuthenticationInput!) {
		getUsers(data: $data) {
			name
			username
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
				data.getUsers.map((user: any) => {
					return (
						<div
							key={user.username}
							className="p-2 bg-default border-b-2 border-secondary"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<img
										src={`/api/avatar/twitter?username=${user.username}`}
										alt={user.username}
										className="w-12 h-12 rounded-full border-2 border-default-inverted bg-secondary-soft"
									/>
									<div className="flex flex-col ml-2">
										<span className="text-default-inverted text-lg">
											{user.name}
										</span>
										<span className="text-default-inverted text-sm">
											@{user.username}
										</span>
									</div>
								</div>
								<Button className="px-2 text-default-inverted bg-default border-2 rounded-md hover:bg-primary hover:text-default hover:border-primary">
									Follow
								</Button>
							</div>
						</div>
					);
				})}
		</>
	);
}

export default UsersList;
