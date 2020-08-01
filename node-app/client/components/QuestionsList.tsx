import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useContext, useEffect } from "react";
import { UserTokenContext, GQLErrorContext } from "../context";
import { isEmpty } from "ramda";
import Loader from "./Loader";
import EmptyCard from "./EmptyCard";

const GET_QUESTIONS = gql`
	query getQuestions($data: TokenAuthenticationInput!) {
		getQuestions(data: $data) {
			id
			content
			location {
				name
			}
			author {
				name
				username
			}
		}
	}
`;

function QuestionsList(): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);

	const { loading, data, error } = useQuery(GET_QUESTIONS, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				token: loginState.token,
			},
		},
	});

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);
	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Questions",
					error: error,
				},
			});
		}
	}, [error, errorDispatcher]);

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
			{data?.getQuestions &&
				data.getQuestions.map((question: any) => {
					return (
						<div
							key={question.id}
							className="border-b-2 border-secondary bg-default p-2 hover:bg-secondary"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<img
										src={`/api/avatar/twitter?username=${question.author.username}`}
										alt={question.author.username}
										className="w-8 h-8 rounded-full border-2 border-default-inverted bg-secondary-soft"
									/>
									<div className="flex flex-col justify-start ml-2">
										<div className="flex">
											<span className="text-default-inverted mb-1">
												{question.author.name}
											</span>
										</div>
										<p className="px-6 py-2 rounded-b-full rounded-r-full bg-primary text-default">
											{question.content}
										</p>
										<div className="flex items-center text-primary text-xs mt-2">
											<svg
												className="w-3 h-3 mr-1"
												version="1.1"
												id="Capa_1"
												x="0px"
												y="0px"
												viewBox="0 0 425.963 425.963"
											>
												<path
													d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
													className="active-path"
													fill="var(--color-primary)"
												/>
											</svg>
											<span>Near,</span>
											<span className="ml-1">{question.location.name}</span>
											<span className="ml-2">{question.author.username}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</>
	);
}

export default QuestionsList;
