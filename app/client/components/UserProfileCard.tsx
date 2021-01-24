import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Timeline from "../screens/timeline";
import Button from "./Button";

import FollowAction from "./FollowAction";
import UserListItem from "./UserListItem";

// Utility function to resolve path of the image
// TODO: need to have a better and stabile way of image path resolving!!!
function displayImage(data: any): string {
	if (process.env.NODE_ENV === "development") {
		return process.env.NODE_ENV === "development"
			? data?.image
				? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo/${data.image}`
				: data.avatar
			: data.image
			? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${data.image}`
			: data.avatar;
	}
	return data?.image
		? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${data.image}`
		: data.avatar;
}

function UserProfileCard({ data }: any) {
	return (
		<>
			<Tabs
				selectedTabClassName="opacity-100 bg-secondary"
				disabledTabClassName="bg-secondary text-default-inverted"
			>
				<div className="flex flex-col items-start">
					<div className="flex flex-col w-full sticky top-0 bg-default border-b-2 border-secondary z-30 mb-2 rounded-b-2xl shadow">
						<div className="flex flex-col items-start w-full">
							<div className="flex relative">
								<img
									src={displayImage(data)}
									alt={data.username}
									className="w-20 h-20 bg-secondary rounded-b-2xl rounded-r-2xl shadow-md"
									style={{
										height: 128,
										width: 128,
									}}
								/>

								<div className="flex flex-col items-start ml-2">
									<p className="text-2xl font-bold text-default-inverted inline-flex items-center">
										{data.name}
									</p>

									{data?.about && (
										<p
											className="text-sm text-default-inverted"
											style={{
												top: -8,
											}}
										>
											{data.about}
										</p>
									)}

									{data?.link && (
										<a href={`${data.link}`}>
											<p className="text-xs text-red-400">{data.link}</p>
										</a>
									)}
									{data._editable ? (
										<div className="flex items-center absolute bottom-0 mb-2">
											<Button className="focus:outline-none px-3 py-1 rounded-full bg-green-400 text-white">
												Edit Profile
											</Button>
										</div>
									) : (
										<div className="flex items-center absolute bottom-0 mb-2">
											<FollowAction {...data} hasLabel />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					<TabList className="w-full border-2 flex justify-center justify-start bg-default border-secondary-soft rounded-md text-default-inverted">
						<Tab className="mr-1 flex flex-col items-center justify-center px-1 flex-1 rounded text-center cursor-pointer opacity-75 text-default-inverted hover:bg-secondary hover:opacity-100 transition duration-150 easy-in-out">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
							<span className="font-bold capitalize">timeline</span>
						</Tab>
						<Tab className="mr-1 flex flex-col items-center justify-center px-1 flex-1 rounded text-center cursor-pointer opacity-75 text-default-inverted hover:border-b-4 border-red-400 hover:opacity-100 transition duration-150 easy-in-out">
							<span className="font-bold">{data.followersCount}</span>
							<span className="font-bold capitalize">followers</span>
						</Tab>
						<Tab className="flex flex-col items-center justify-center px-1 flex-1 rounded text-center cursor-pointer opacity-75 text-default-inverted hover:bg-secondary hover:opacity-100 transition duration-150 easy-in-out ">
							<span className="font-bold">{data.followingCount}</span>
							<span className="font-bold capitalize">following</span>
						</Tab>
					</TabList>

					<TabPanel className="flex flex-col w-full mt-2">
						<Timeline username={data.username} />
					</TabPanel>

					<TabPanel className="mx-auto container">
						<>
							<div className="flex flex-col my-2">
								{data?.followers &&
									data.followers.map((user: any) => (
										<UserListItem
											{...user}
											key={user.username}
											ableToFollow={false}
											hasGap
										/>
									))}
							</div>
						</>
					</TabPanel>

					<TabPanel className="mx-auto container">
						<>
							<div className="flex flex-col my-2">
								{data?.following &&
									data.following.map((user: any) => (
										<UserListItem
											{...user}
											key={user.username}
											ableToFollow={false}
											hasGap
										/>
									))}
							</div>
						</>
					</TabPanel>
				</div>
			</Tabs>
		</>
	);
}

export default UserProfileCard;
