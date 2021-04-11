import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { getImageOrAvatarPath } from "../../shared/utils";
import Loader from "./Loader";

const GET_LAST_REGISTERED_USERS = gql`
	query {
		getLastRegisteredUsers {
			username
			name
			avatar
			image
		}
	}
`;

export default function LatestUsers(): JSX.Element {
	const { data, loading, error } = useQuery(GET_LAST_REGISTERED_USERS);

	if (loading && !error && !data) {
		return <Loader />;
	}

	return (
		<div className="flex items-center justify-center mb-3">
			{data?.getLastRegisteredUsers &&
				data.getLastRegisteredUsers.map((user: any, index: number) => (
					<figure
						key={index}
						className="flex items-center justify-center relative"
						style={{
							left: 3.5 * data.getLastRegisteredUsers.length,
						}}
					>
						<img
							className="w-8 h-8 border-2 rounded-full relative cursor-pointer"
							src={getImageOrAvatarPath(user.image, user.avatar)}
							alt={user.name}
							style={{
								height: 32,
								width: 32,
								left: -(10 * index),
							}}
						/>
					</figure>
				))}
		</div>
	);
}
