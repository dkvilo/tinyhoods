import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useContext, useEffect } from "react";
import { UserTokenContext, GQLErrorContext, FiltersContext } from "../context";
import { isEmpty } from "ramda";
import Loader from "./Loader";
import EmptyCard from "./EmptyCard";
import QuestionListItem from "./QuestionListItem";

const GET_QUESTIONS_ON_LOCATION = gql`
	query getQuestionsOnLocation($data: GetQuestionsOnLocationInputType!) {
		getQuestionsOnLocation(data: $data) {
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
	const { state: filterState } = useContext<any>(FiltersContext);

	const { loading, data, error } = useQuery(GET_QUESTIONS_ON_LOCATION, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				token: loginState.token,
				location: filterState.selectedLocationData.id,
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

	if (!loading && !error && isEmpty(data?.getQuestionsOnLocation)) {
		return <EmptyCard />;
	}

	return (
		<>
			{data?.getQuestionsOnLocation && (
				<div className="mb-2 p-2 flex items-center border-b-2 bg-secondary rounded-sm">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="var(--color-primary)"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-message-circle h-5 w-5 mr-1"
					>
						<path
							className="active-path"
							d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
						></path>
					</svg>
					<h1 className="text-primary text-sm">
						Discussion about{" "}
						<span className="font-bold">
							{data.getQuestionsOnLocation[0].location.name}{" "}
						</span>
					</h1>
				</div>
			)}
			{data?.getQuestionsOnLocation &&
				data.getQuestionsOnLocation.map((question: any) => (
					<QuestionListItem {...question} key={question.id} />
				))}
		</>
	);
}

export default QuestionsList;
