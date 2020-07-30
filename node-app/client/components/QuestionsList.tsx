import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import { UserTokenContext } from "../context";
import { isEmpty } from "ramda";

const GET_QUESTIONS = gql`
	{
		getQuestions {
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
	});

	if (loading && !error) {
		return (
			<div className="p-2 bg-default rounded-lg mb-4">
				<p className="py-2 text-default-inverted">Loading ...</p>
			</div>
		);
	}

	if (!loading && !error && isEmpty(data?.getUsers)) {
		return (
			<div className="p-2 bg-default rounded-lg mb-4">
				<p className="py-2 text-default-inverted">
					There is not content to show
				</p>
			</div>
		);
	}
	return (
		<>
			{data?.getQuestions &&
				data.getQuestions.map((question: any) => {
					return (
						<div
							key={question.id}
							className="p-2 bg-default rounded-lg mb-4 shadow-md"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<img
										src={`/api/avatar/twitter?username=${question.author.username}`}
										alt={question.author.username}
										className="w-6 h-6 rounded-full border-2 border-default-inverted bg-secondary-soft"
									/>
									<div className="flex flex-col ml-2">
										<span className="text-default-inverted text-md">
											{question.content}
										</span>
										<span className="text-default-inverted text-sm">
											@{question.location.name}
										</span>
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
