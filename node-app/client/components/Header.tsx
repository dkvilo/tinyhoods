import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";

import { useDropToggleState } from "../hooks";
import { UserTokenContext } from "../context";

import Modal from "./Modal";
import SearchInput from "./SearchInput";

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
			membership {
				isPaid
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
							loginState.isLogin && !loading && !error
								? data?.getMyInfo.avatar
								: "/avatar.svg"
						}
						className="ml-2 w-8 h-8 rounded-full border-2 border-default-inverted cursor-pointer"
					/>
					<div className="ml-3">
						<SearchInput placeholder="Search ..." />
					</div>
				</div>

				<button
					onClick={updateAskQuestionModalState as any}
					className="outline-none w-12 h-10 ml-2 bg-default shadow-md rounded-full p-2"
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
				<button
					onClick={updateAddLocationModalState as any}
					className="outline-none w-12 h-10 ml-2 bg-default shadow-md rounded-full p-2"
					style={{
						outline: "none",
					}}
				>
					<svg
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
				</button>
			</div>
		</>
	);
}
