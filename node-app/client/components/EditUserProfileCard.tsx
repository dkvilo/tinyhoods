import React, { useContext } from "react";
import moment from "moment";
import { UserTokenContext } from "../context";

import AccountPrivacy from "../forms/user/AccountPrivacy";

import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import SliderInput from "./SliderInput";
import CheckoutContainer from "./CheckoutContainer";

function EditUserProfileCard({ data }: any) {
	const { dispatch } = useContext<any>(UserTokenContext);

	return (
		<div className="flex flex-col items-center justify-center my-6">
			<img
				src={data.avatar}
				alt={data.username}
				className="w-20 h-20 rounded-full border-4 border-default-inverted"
				style={{
					height: 80,
					width: 80,
				}}
			/>

			<div className="flex flex-col items-center justify-center p-2">
				<p className="text-2xl font-bold text-default-inverted">{data.name}</p>
				<p className="text-md text-default-inverted">@{data.username}</p>
				<p className="text-sm text-primary p-1">{data.link}</p>
				<p className="text-sm text-default-inverted p-1">{data.about}</p>
			</div>

			<div className="flex justify-center p-1 text-default-inverted">
				<div className="p-2 rounded bg-secondary mr-1 text-center">
					<span className="font-bold">{data.followersCount}</span> Followers
				</div>
				<div className="p-2 rounded bg-secondary mr-1 text-center">
					<span className="font-bold">{data.followingCount}</span> Following
				</div>
				<div className="p-2 rounded bg-secondary text-center">
					<span className="font-bold">{data.questionsCount}</span> Questions
				</div>
			</div>

			{data.membership.isPaid && (
				<div className="flex my-4 items-center justify-start p-1 bg-primary text-default rounded-md w-full">
					<img
						src="/ticket.svg"
						className="w-16 h-16 p-1"
						style={{
							transform: "rotate(-90deg)",
						}}
					/>
					<div className="flex flex-col justify-start">
						<span className="font-bold text-md">Membership Expire Date</span>
						<span className="font-bold text-sm rounded">
							{moment(data.membership.expiresAt).format("LLLL")}
						</span>
					</div>
				</div>
			)}

			<div className="flex flex-col w-full bg-default rounded-md ">
				<div className="my-2">
					<h1 className="text-2xl text-default-inverted font-bold py-2">
						App Settings
					</h1>
					<div className="flex items-center w-full mb-3 px-2 py-3 bg-secondary rounded">
						<SliderInput />
					</div>
					<div className="flex items-center justify-between p-2 bg-secondary rounded">
						<p className="text-sm text-default-inverted">Dark Mode</p>
						<ThemeToggle />
					</div>
				</div>

				{!data.membership.isPaid && <CheckoutContainer />}

				<h1 className="text-2xl text-default-inverted font-bold py-2">
					Account Settings
				</h1>
				<div className="flex items-center">
					<AccountPrivacy isPrivate={data.isPrivate} />
				</div>

				<div className="my-5 flex items-center bg-secondary rounded">
					<Button
						onClick={() => {
							dispatch({ type: "UNSET_TOKEN" });
						}}
						className="px-2 py-1 text-red-500 bg-default border-2 rounded-md hover:bg-red-500 hover:text-default hover:border-red-500 w-full"
					>
						Sign out
					</Button>
				</div>
			</div>
		</div>
	);
}

export default EditUserProfileCard;
