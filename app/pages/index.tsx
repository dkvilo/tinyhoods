import React, { useContext } from "react";
import { useRouter } from "next/router";

import { CSSTransition } from "react-transition-group";
import { UserTokenContext } from "../client/context";

import SEOHeader from "../client/components/SEOHeader";
import EditUserProfileCard from "../client/components/EditUserProfileCard";
import AuthCard from "../client/components/AuthCard";
import { useDropToggleState } from "../client/hooks";
import Modal from "../client/components/Modal";
import AddPost from "../client/forms/post/add";
import { Router, ShallowQuery } from "../client/components/ShallowRouter";
import AddHood from "../client/forms/hoods/add";
import Feed from "../client/screens/feed";
import Link from "next/link";

import { initializeApollo, addApolloState } from "../libs/apolloClient";

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	return addApolloState(apolloClient, {
		props: {},
		// unstable_revalidate: 1,
	});
}

export default function () {
	const { state: loginState } = useContext<any>(UserTokenContext);
	const router = useRouter();

	const createPostModalStateController = useDropToggleState(false as any);
	const [
		createPostModalState,
		updateCreatePostModalState,
	] = createPostModalStateController;

	return (
		<>
			<CSSTransition
				in={createPostModalState as boolean}
				timeout={300}
				classNames="swoop-in"
			>
				<Modal title="Create Post" controller={createPostModalStateController}>
					{/* Close Modal when post will be published */}
					<AddPost onSuccess={updateCreatePostModalState} />
				</Modal>
			</CSSTransition>

			<div className="flex container mx-auto">
				<SEOHeader title="TinyHoods" description=" - Explore tiny world" />
				{/* Left */}
				<div className="w-1/4 hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex flex-col items-center px-5">
					<div className="sticky top-0 rounded w-auto">
						{loginState.isLogin ? <EditUserProfileCard /> : <AuthCard />}
					</div>
				</div>
				{/* [/Left] */}

				{/* Content */}
				<div className="w-full min-h-screen xs:w-full sm:w-full md:w-full lg:w-2/3 xl:w-2/4 shadow-md p-2 bg-default xs:mb-6 sm:mb-6 md:mb-6">
					<div className="hidden xs:hidden sm:hidden md:hidden lg:block xl:block w-full bg-default px-2">
						<div className="flex flex-col flex-wrap -mx-3">
							<div>
								<Link href="/">
									<span className="px-2 cursor-pointer pt-3 pb-2 text-default-inverted text-2xl font-bold">
										TINYHOODS
									</span>
								</Link>
							</div>
							{loginState.isLogin && (
								<div className="w-32 mx-1 hover:bg-secondary">
									<button
										onClick={updateCreatePostModalState}
										className="flex items-center leading-normal w-full h-10 text-left font-medium text-default-inverted focus:outline-none"
									>
										<svg
											className="fill-current text-default-inverted w-8 h-8"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"></path>
										</svg>
										<span className="ml-1">Share Post</span>
									</button>
								</div>
							)}
						</div>
					</div>
					<ShallowQuery selector="page" default={<Feed />}>
						<Router on="feed" component={<Feed />} />
						<Router on="add-hood" component={<AddHood />} />
					</ShallowQuery>
				</div>
				{/* [/Content]  */}

				{/* Right */}
				<div className="w-1/4 hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex flex-col px-2">
					<div className="sticky top-0 rounded w-auto">
						<div className="flex flex-col p-4 mt-1">
							<button
								onClick={() =>
									router.push("/?page=feed", undefined, {
										shallow: true,
									})
								}
								className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
							>
								Feed
							</button>
							<button
								onClick={() =>
									router.push("/?page=add-hood", undefined, { shallow: true })
								}
								className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
							>
								Create Location
							</button>
						</div>

						<div className="px-4 mb-4">
							<p className="text-default-inverted font-bold text-sm mb-1">
								Sponsored
							</p>
							<div className="flex items-center justify-center bg-secondary rounded-md w-full h-64"></div>
						</div>
						{/* <UsersList /> */}
					</div>
				</div>
				{/* [/Content] */}
			</div>

			{/* Mobile Menu */}
			<div className="p-4 w-full bg-default fixed bottom-0 block xs:block sm:block md:block lg:hidden xl:hidden">
				<div className="px-2 py-1 rounded-full bg-secondary text-default">
					<div className="flex items-center justify-evenly">
						{/* Home Button */}
						<button className="p-2 rounded-full focus:outline-none">
							<svg
								className=" fill-current text-default-inverted w-8 h-8"
								viewBox="0 0 48 48"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clipRule="evenodd"
									d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
									fillRule="evenodd"
								></path>{" "}
							</svg>
						</button>
						{/* Add Post */}
						<button
							onClick={updateCreatePostModalState as any}
							className="p-2 rounded-full focus:outline-none bg-secondary-soft"
						>
							<svg
								className=" fill-current text-default-inverted w-8 h-8"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"></path>
							</svg>
						</button>

						{/* Search */}
						<button className="p-2 rounded-full focus:outline-none">
							<svg
								className=" fill-current text-default-inverted w-8 h-8"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="nonzero"
									d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"
								></path>{" "}
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
