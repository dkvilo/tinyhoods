import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

import { useDropToggleState } from "../hooks";
import { UserTokenContext } from "../context";

import Modal from "./Modal";
import SearchInput from "./SearchInput";

import AddQuestion from "../forms/questions/add";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import EditUserProfileCard from "./EditUserProfileCard";
import AuthCard from "./AuthCard";

const GET_MY_INFO = gql`
	query getMyInfo($data: TokenAuthenticationInput!) {
		getMyInfo(data: $data) {
			username
			name
			avatar
			about
			locationCount
			questionsCount
			followersCount
			followingCount
			isPrivate
			link
			image
			membership {
				isPaid
				startedAt
				expiresAt
			}
		}
	}
`;

export default function (): JSX.Element {
	const askQuestionModalController = useDropToggleState(false);
	const [
		askQuestionModalState,
		updateAskQuestionModalState,
	] = askQuestionModalController;

	const authModalController = useDropToggleState(false);
	const [authModalState, updateAuthModalState] = authModalController;

	const { state: loginState } = useContext<any>(UserTokenContext);

	const { loading, data, error, refetch } = useQuery(GET_MY_INFO, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				token: loginState.token,
			},
		},
	});

	return (
		<>
			<CSSTransition
				in={authModalState as boolean}
				timeout={300}
				classNames="swoop-in"
			>
				<Modal
					title={`${
						loginState.isLogin && !loading && !error
							? "Hello, " + data.getMyInfo.name.split(" ")[0] + " 👋"
							: "Member Area"
					}`}
					controller={authModalController}
				>
					{loginState.isLogin && !loading && !error ? (
						<EditUserProfileCard fromMap />
					) : (
						<AuthCard />
					)}
				</Modal>
			</CSSTransition>

			<CSSTransition
				in={askQuestionModalState as boolean}
				timeout={300}
				classNames="swoop-in"
			>
				<Modal title="Ask a Question" controller={askQuestionModalController}>
					{loginState.isLogin ? <AddQuestion /> : <AuthCard />}
				</Modal>
			</CSSTransition>

			<div className="container mx-auto flex items-center justify-between">
				<div className="flex shadow-md w-full bg-default rounded-full items-center">
					<img
						onClick={updateAuthModalState as any}
						style={{
							width: 32,
							height: 32,
						}}
						alt="avatar"
						src={
							loginState.isLogin && !loading && !error && data?.getMyInfo
								? data.getMyInfo.image
									? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo/${data.getMyInfo.image}`
									: data.getMyInfo.avatar
									? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${data.getMyInfo.image}`
									: "/avatar.svg"
								: "/avatar.svg"
						}
						className="ml-2 w-8 h-8 rounded-full border-2 border-default-inverted cursor-pointer transform transition-all duration-300 scale-100 hover:scale-95"
					/>
					<div className="ml-3 flex flex-col relative">
						<SearchInput placeholder="Search ..." />
					</div>
				</div>

				<button
					onClick={updateAskQuestionModalState as any}
					className="transform transition-all duration-300 scale-100 hover:scale-95 outline-none w-12 h-10 ml-2 bg-default shadow-md rounded-full p-2"
					style={{
						outline: "none",
					}}
				>
					<svg fill="var(--color-primary)" viewBox="0 0 20 20">
						<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
						<path
							fillRule="evenodd"
							d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
			</div>
		</>
	);
}
