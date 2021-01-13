import { useContext, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { GQLErrorContext, UserTokenContext } from "../../context";
import { TOGGLE_LIKE } from "./query";
import { IProps } from "./types";

export default function ({ postId, onAction }: IProps): JSX.Element {
	const { state: loginState } = useContext(UserTokenContext);

	const [toggleLikePost, { loading, error, data }] = useMutation(TOGGLE_LIKE);

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);

	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Unlike",
					error: error,
				},
			});
		}
	}, [error, errorDispatcher]);

	const handleUnLikeRequest = async () => {
		// Put UI on Success Mode, for better user experience
		onAction(true);
		// Send the actual like request
		await toggleLikePost({
			variables: {
				data: {
					token: loginState.token,
					postId,
				},
			},
		});
	};

	useEffect(() => {
		// Check for the response of like request and if
		if (!loading && !error && data?.createToggleLikePost) {
			// if request was successful don't re-inform the parent component,
			//  cause it already has the information,
			// if request was not successful,
			// then inform parent component to remove success status
			if (!data?.createToggleLikePost) {
				onAction(false);
			}
		}
	}, [data, loading, error]);

	return (
		<button
			onClick={handleUnLikeRequest}
			className="p-1 rounded-full focus:outline-none"
		>
			<svg
				viewBox="0 0 23 23"
				strokeWidth="2"
				className="stroke-current h-6 w-6 text-red-500"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="3"
					fill="none"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
		</button>
	);
}
