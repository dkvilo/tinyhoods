import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

import { useDropToggleState } from "../hooks";
import { UserTokenContext } from "../context";

import Modal from "./Modal";

import AddHood from "../forms/hoods/add";
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
	const addLocationModalController = useDropToggleState(false as any);
	const [
		addLocationModalState,
		updateAddLocationModalState,
	] = addLocationModalController;

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
		<div className="">
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
						<EditUserProfileCard data={data.getMyInfo} />
					) : (
						<AuthCard />
					)}
				</Modal>
			</CSSTransition>

			<CSSTransition
				in={addLocationModalState as boolean}
				timeout={300}
				classNames="swoop-in"
			>
				<Modal title="Add Location" controller={addLocationModalController}>
					{loginState.isLogin ? <AddHood /> : <AuthCard />}
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

			<div className="flex items-center justify-between">
				<div className="flex my-2 w-full bg-default items-center">
					<img
						onClick={updateAuthModalState as any}
						style={{
							width: 32,
							height: 32,
						}}
						alt="avatar"
						src={
							loginState.isLogin && !loading && !error
								? data.getMyInfo.image
									? `/imcargo/${data.getMyInfo.image}`
									: data.getMyInfo.avatar
								: "/avatar.svg"
						}
						className="ml-2 w-8 h-8 rounded-full border-2 border-default-inverted cursor-pointer transform transition-all duration-300 scale-100 hover:scale-95"
					/>
					<h1 className="text-default-inverted ml-2 text-bold">
						{loginState.isLogin && data?.getMyInfo.username}
					</h1>
					{/* <div className="ml-3 flex flex-col relative">
						<SearchInput placeholder="Search ..." />
					</div> */}
				</div>
			</div>
		</div>
	);
}
