import React, { useContext } from "react";
import moment from "moment";

import { UserTokenContext } from "../context";
import { isMembershipExpired } from "../../shared/functions";

import AccountPrivacy from "../forms/user/AccountPrivacy";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import CheckoutContainer from "./CheckoutContainer";
import SliderInput from "./SliderInput";
import UserBadges from "./UserBadges";
import Avatar from "./Avatar";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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

function EditUserProfileCard() {
	const { state: loginState, dispatch } = useContext<any>(UserTokenContext);

	const { loading, data, error, refetch } = useQuery(GET_MY_INFO, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				token: loginState.token,
			},
		},
	});

	if (!loading && !error && data?.getMyInfo)
		return (
			<div className="flex flex-col items-center justify-center mt-2">
				<Avatar
					username={data.getMyInfo.username}
					src={
						data.getMyInfo.image
							? `/imcargo/${data.getMyInfo.image}`
							: data.getMyInfo.avatar
					}
				/>

				<div className="flex flex-col items-center justify-center px-2">
					{data.getMyInfo.name && (
						<p className="text-2xl font-bold text-default-inverted">
							{data.getMyInfo.name}
						</p>
					)}
					{data.getMyInfo.username && (
						<p className="text-md text-default-inverted">
							@{data.getMyInfo.username}
						</p>
					)}
					{data.getMyInfo.link && (
						<p className="text-sm text-primary p-1">{data.getMyInfo.link}</p>
					)}
					{data.getMyInfo.about && (
						<p className="text-sm text-default-inverted p-1">
							{data.getMyInfo.about}
						</p>
					)}
				</div>

				<div className="flex justify-center bg-default rounded-md shadow my-2 p-2 text-default-inverted">
					<div className="px-1 rounded mr-1 text-center">
						<span className="font-bold">{data.getMyInfo.followersCount}</span>{" "}
						Followers
					</div>
					<div className="px-1 rounded mr-1 text-center">
						<span className="font-bold">{data.getMyInfo.followingCount}</span>{" "}
						Following
					</div>
					<div className="px-1 rounded text-center">
						<span className="font-bold">{data.getMyInfo.questionsCount}</span>{" "}
						Questions
					</div>
				</div>

				{isMembershipExpired(data.getMyInfo.membership.expiresAt) && (
					<CheckoutContainer />
				)}

				<div className="flex flex-col w-full">
					{/* <div className="my-2">
					<div className="flex items-center w-full mb-3 ">
						{!isMembershipExpired(data.getMyInfo.membership.expiresAt) ? (
							<SliderInput />
						) : (
							<div className="flex flex-col items-center justify-center text-center w-full p-2">
								<span className="text-default-inverted text-2xl font-bold">
									10km
								</span>
								<span className="text-primary text-md">
									Visibility Distance is Locked by default
								</span>
								<span className="text-primary text-sm">
									Upgrade Your membership by joining the Travelers Club and
									unlock unlimited features
								</span>
							</div>
						)}
					</div>
				</div> */}

					{/* <UserBadges data={data} /> */}

					<h1 className="text-xl text-default-inverted font-bold py-2">
						User Settings
					</h1>
					<div className="flex items-center">
						<AccountPrivacy isPrivate={data.getMyInfo.isPrivate} />
					</div>

					<h1 className="text-xl text-default-inverted font-bold py-2">
						App Settings
					</h1>
					<div className="flex items-center justify-between py-2 rounded">
						<p className="text-sm text-default-inverted">Dark Mode</p>
						<ThemeToggle />
					</div>

					{!isMembershipExpired(data.getMyInfo.membership.expiresAt) && (
						<div className="flex mt-4 items-center justify-start bg-primary text-default rounded-md w-full xs:w-full sm:w-full md:w-full lg:w-full xl:w-full">
							<div className="flex flex-col justify-start p-2">
								<span className="font-bold text-md">
									Membership Expiry Date
								</span>
								<span className="font-bold text-sm rounded">
									{moment(data.getMyInfo.membership.expiresAt).format("LLLL")}
								</span>
							</div>
						</div>
					)}

					<div className="mt-5 flex items-center bg-secondary rounded">
						<Button
							onClick={() => {
								dispatch({ type: "UNSET_TOKEN" });
							}}
							className="p-2 py-1 text-red-500 bg-default border-2 rounded-md hover:bg-red-500 hover:text-default hover:border-red-500 w-full"
						>
							Sign out
						</Button>
					</div>
				</div>
			</div>
		);

	return (
		<div className="flex flex-col items-center mt-2">
			<div className="w-20 h-20 bg-secondary-soft rounded-full lazy__boy"></div>
			<div className="w-64 h-6 mt-3 bg-secondary-soft rounded lazy__boy"></div>
			<div className="w-32 h-2 mt-3 bg-secondary-soft rounded lazy__boy"></div>
			<div className="mt-6 flex flex-col items-center justify-evenly">
				<div className="w-64 h-6 bg-secondary-soft rounded lazy__boy"></div>
			</div>
			<div className="mt-6 flex flex-col items-center justify-evenly">
				<div className="w-64 h-6 bg-secondary-soft rounded lazy__boy"></div>
			</div>
			<div className="mt-6 flex items-center justify-between">
				<div className="w-64 h-6 bg-secondary-soft rounded lazy__boy"></div>
			</div>
			<div className="mt-20 flex items-center justify-between">
				<div className="w-64 h-6 bg-secondary-soft rounded lazy__boy"></div>
			</div>
		</div>
	);
}

export default EditUserProfileCard;
