import React, { useEffect, useContext } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import SEOHeader from "../../../client/components/SEOHeader";
import Grid from "../../../client/components/Grid";

import { useRouter } from "next/dist/client/router";
import {
	UserTokenContext,
	LoaderProgressContext,
	GQLErrorContext,
} from "../../../client/context";
import Loader from "../../../client/components/Loader";
import Button from "../../../client/components/Button";

const CONFIRM_CHECKOUT_SESSION = gql`
	mutation confirmCheckoutSession($data: ConfirmCheckoutSessionInput!) {
		confirmCheckoutSession(data: $data)
	}
`;

export default function Success() {
	const router = useRouter();
	const { user, plan, session_id } = router.query;

	const { state: loginState } = useContext<any>(UserTokenContext);

	const [confirmCheckoutSession, { loading, error, data }] = useMutation(
		CONFIRM_CHECKOUT_SESSION
	);

	useEffect(() => {
		if (user && plan && session_id) {
			(async () => {
				try {
					await confirmCheckoutSession({
						variables: {
							data: {
								token: loginState.token,
								user,
								plan,
								sessionId: session_id,
							},
						},
					});
				} catch (e) {}
			})();
		}
	}, [confirmCheckoutSession, user, plan, session_id]);

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);

	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Checkout Confirmation",
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

	return (
		<div className=" w-full h-screen overflow-x-scroll">
			<SEOHeader title="TinyHoods" description=" - Checkout Confirmation" />

			<Grid>
				<div className="flex flex-col items-center">
					{loading && !error && !data?.confirmCheckoutSession && <Loader />}
					{!loading && error && (
						<div className="flex my-10 flex-col items-center justify-center w-full">
							<img src="/error.svg" alt="Unsuccessful Payment" />

							<>
								{error &&
									JSON.parse(JSON.stringify(error as any)).graphQLErrors.map(
										(err: string) => (
											<div className="my-2 p-2" key={err}>
												{err}
											</div>
										)
									)}
							</>
						</div>
					)}

					{!loading && !error && data?.confirmCheckoutSession && (
						<div className="flex my-10 flex-col items-center justify-center w-full">
							<img src="/confirm.svg" alt="Successful Payment" />
							<div className="flex flex-col items-center justify-center p-4 w-full rounded text-primary text-2xl">
								<div>Payment was successful</div>
							</div>
							<Link href="/">
								<span className="flex items-center justify-center mt-2 bg-default w-full text-primary p-2 rounded-md">
									Go to Home Page
								</span>
							</Link>
						</div>
					)}
				</div>
			</Grid>
		</div>
	);
}
