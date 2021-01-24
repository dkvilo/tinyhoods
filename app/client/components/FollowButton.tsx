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
	hasLabel?: boolean;
	onAction(status: boolean): void;
}

const FOLLOW_USER = gql`
	mutation followUser($data: FollowUser!) {
		followUser(data: $data)
	}
`;

function FollowButton({
	username,
	onAction,
	hasLabel = false,
}: IProps): JSX.Element {
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
		try {
			const response = await followUser({
				variables: {
					data: {
						token: loginState.token,
						username,
					},
				},
			});
			if (response.data?.followUser) {
				onAction(true);
			}
		} catch (e) {}
	}

	return (
		<Button
			onClick={triggerFollow}
			className="px-2 py-1 flex flex-row-reverse items-center text-default-inverted bg-default border-2 rounded-full hover:bg-green-500 hover:text-default hover:border-green-500"
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
					{hasLabel && <span className="text-sm ml-1">Follow</span>}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						className="w-5 h-5"
						fill="currentColor"
					>
						<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
					</svg>
				</>
			)}
		</Button>
	);
}

export default FollowButton;
