import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useContext } from "react";
import { UserTokenContext } from "../context";
import Button from "./Button";

interface IProps {
	username: string;
	_following?: boolean;
}

const FOLLOW_USER = gql`
	mutation followUser($data: FollowUser!) {
		followUser(data: $data)
	}
`;

function FollowButton({ username, _following }: IProps): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);

	const [followUser, { loading, data, error }] = useMutation(FOLLOW_USER);

	async function triggerFollow() {
		const response = await followUser({
			variables: {
				data: {
					token: loginState.token,
					username,
				},
			},
		});
	}

	if (_following) {
		return (
			<Button
				onClick={triggerFollow}
				className="px-2 text-default-inverted bg-default border-2 rounded-md hover:bg-primary hover:text-default hover:border-primary"
			>
				{loading
					? "Loading ..."
					: data?.followUser && data.followUser
					? "Follow"
					: "Unfollow"}
			</Button>
		);
	}

	return (
		<Button
			onClick={triggerFollow}
			className="px-2 text-default-inverted bg-default border-2 rounded-md hover:bg-primary hover:text-default hover:border-primary"
		>
			{loading
				? "Loading ..."
				: data?.followUser && data.followUser
				? "Unfollow"
				: "Follow"}
		</Button>
	);
}

export default FollowButton;
