import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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

export default function (): JSX.Element {
	const { data, loading, error } = useQuery(GET_LAST_REGISTERED_USERS);

	if (loading && !error && !data) {
		return <Loader />;
	}

	return (
		<div className="flex items-center justify-center mb-3">
			{data.getLastRegisteredUsers.map((user: any, index: number) => (
				<figure
					key={index}
					className="flex items-center justify-center relative"
					style={{
						left: 2 * data.getLastRegisteredUsers.length,
					}}
				>
					<img
						className="w-8 h-8 border-2 rounded-full relative cursor-pointer"
						src={
							process.env.NODE_ENV === "development"
								? user.image
									? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo/${user.image}`
									: user.avatar
								: user.image
								? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${user.image}`
								: user.avatar
						}
						alt={user.name}
						style={{
							left: -(10 * index),
						}}
					/>
				</figure>
			))}
		</div>
	);
}
