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

const FOLLOW_USER = gql`
	mutation followUser($data: FollowUser!) {
		followUser(data: $data)
	}
`;

function FollowButton({ username, onAction }: IProps): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);

	const [followUser, { loading, error }] = useMutation(FOLLOW_USER);

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);
	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Follow User",
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

	async function triggerFollow() {
		const response = await followUser({
			variables: {
				data: {
					token: loginState.token,
					username,
				},
			},
		});

		if (response.data.followUser) {
			onAction(true);
		}
	}

	return (
		<Button
			onClick={triggerFollow}
			className="px-2 text-primary bg-default border-2 rounded-full hover:bg-primary hover:text-default hover:border-primary"
		>
			{loading ? "Loading ..." : "Follow"}
		</Button>
	);
}

export default FollowButton;
