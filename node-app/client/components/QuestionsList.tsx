import React, { useContext, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { isEmpty } from "ramda";
import { UserTokenContext, GQLErrorContext } from "../context";

import Loader from "./Loader";
import EmptyCard from "./EmptyCard";
import QuestionListItem from "./QuestionListItem";

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
				image
				avatar
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
				data.getQuestions.map((question: any) => (
					<QuestionListItem {...question} key={question.id} />
				))}
		</>
	);
}

export default QuestionsList;
