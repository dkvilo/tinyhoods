import React, { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import AccountPrivacy from "../forms/user/AccountPrivacy";
import Button from "./Button";
import { UserTokenContext } from "../context";

function EditUserProfileCard({ data }: any) {
	const { dispatch } = useContext<any>(UserTokenContext);

	return (
		<div className="flex flex-col items-center justify-center my-6">
			<img
				src={data.avatar}
				alt={data.username}
				className="w-32 h-32 rounded-full border-4 border-default-inverted"
				style={{
					height: 128,
					width: 128,
				}}
			/>

			<div className="flex flex-col items-center justify-center p-2">
				<p className="text-2xl font-bold text-default-inverted">{data.name}</p>
				<p className="text-md text-default-inverted">@{data.username}</p>
				<p className="text-sm text-primary p-1">{data.link}</p>
				<p className="text-sm text-default-inverted p-1">{data.about}</p>
			</div>

			<div className="flex justify-center p-1 text-default-inverted">
				<div className="p-2">
					<span className="font-bold">100K</span> Followers
				</div>
				<div className="p-2">
					<span className="font-bold">25</span> Following
				</div>
				<div className="p-2">
					<span className="font-bold">0</span> Questions
				</div>
				<div className="p-2">
					<span className="font-bold">0</span> Posts
				</div>
			</div>

			<div className="flex flex-col w-full bg-default rounded-md ">
				<h1 className="text-2xl text-default-inverted font-bold py-2">
					Account Settings
				</h1>
				<div className="flex items-center">
					<AccountPrivacy isPrivate={data.isPrivate} />
				</div>

				<div className="my-2">
					<h1 className="text-2xl text-default-inverted font-bold py-2">
						App Settings
					</h1>
					<div className="flex items-center justify-between p-2 bg-secondary rounded">
						<p className="text-sm text-default-inverted">Dark Mode</p>
						<ThemeToggle />
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
		</div>
	);
}

export default EditUserProfileCard;
