import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useContext, useEffect } from "react";
import {
	GQLErrorContext,
	LoaderProgressContext,
	UserTokenContext,
} from "../context";
import Button from "./Button";

interface IProps {
	username: string;
	onAction(status: boolean): void;
}

const UNFOLLOW_USER = gql`
	mutation unfollowUser($data: FollowUser!) {
		unfollowUser(data: $data)
	}
`;

function UnfollowButton({ username, onAction }: IProps): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);

	const [unfollowUser, { loading, error }] = useMutation(UNFOLLOW_USER);
	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);
	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Unfollow User",
					error: error,
				},
			});
		}
	}, [error, errorDispatcher]);

	const { dispatch: loaderDispatcher } = useContext<any>(LoaderProgressContext);
	useEffect(() => {
		if (loading) {
			loaderDispatcher({ type: "START" });
		} else {
			loaderDispatcher({ type: "STOP" });
		}
	}, [loading, loaderDispatcher]);

	async function triggerUnfollow() {
		const response = await unfollowUser({
			variables: {
				data: {
					token: loginState.token,
					username,
				},
			},
		});

		if (response.data.unfollowUser) {
			onAction(false);
		}
	}

	return (
		<Button
			onClick={triggerUnfollow}
			className="px-2 text-red-500 bg-default border-2 rounded-full hover:bg-red-500 hover:text-default hover:border-red-500"
		>
			{loading ? "Loading ..." : "Remove"}
		</Button>
	);
}

export default UnfollowButton;
