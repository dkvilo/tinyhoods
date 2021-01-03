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
			className="px-1 text-red-500 bg-default border-2 rounded-full hover:bg-red-500 hover:text-default hover:border-red-500"
		>
			{loading ? (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						className="w-5 h-5"
						fill="currentColor"
					>
						{" "}
						<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
					</svg>
				</>
			) : (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						className="w-5 h-5"
						fill="currentColor"
					>
						<path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
					</svg>
				</>
			)}
		</Button>
	);
}

export default UnfollowButton;
