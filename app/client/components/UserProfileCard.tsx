import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Image from "next/image";

import Button from "./Button";
import FollowAction from "./FollowAction";
import UserListItem from "./UserListItem";

import Timeline from "../screens/timeline";

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
				selectedTabClassName="opacity-100 border-b-4 border-red-400"
				disabledTabClassName="bg-secondary text-default-inverted"
			>
				<div className="flex flex-col items-start">
					<div className="hidden xs:hidden sm:hidden md:flex lg:flex xl:flex flex-col w-full bg-default z-30 mb-2 shadow p-2">
						<div className="flex flex-col items-start w-full">
							<div className="flex relative">
								<Image
									unoptimized
									objectFit="cover"
									src={displayImage(data)}
									width={128}
									className="rounded-full"
									height={128}
									alt={data.username}
									title={data.username}
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
										<div className="flex items-center absolute bottom-0 mb-0 xs:mb-0 sm:mb-0 md:mb-3 lg:mb-3 xl:mb-3">
											<Button className="focus:outline-none flex items-center pr-1 rounded-md bg-secondary border-2 text-default-inverted">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													className="w-6 h-6 p-1"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
												<span className="text-sm">Edit Profile</span>
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

						<div className="flex mt-2 text-default-inverted rounded">
							<div className="flex flex-col bg-secondary flex-1 items-center p-1 m-1 w-full rounded">
								<h1 className="font-bold text-lg">{data.followersCount}</h1>
								<span className="text-xs">Followers</span>
							</div>
							<div className="flex flex-col bg-secondary flex-1 items-center p-1 m-1 w-full rounded">
								<h1 className="font-bold text-lg">{data.followingCount}</h1>
								<span className="text-xs">Following</span>
							</div>
							{Boolean(data.locationCount) && (
								<div className="flex flex-col bg-secondary flex-1 items-center p-1 m-1 w-full rounded">
									<h1 className="font-bold text-lg">{data.locationCount}</h1>
									<span className="text-xs">Locations</span>
								</div>
							)}
							{Boolean(data.projectsCount) && (
								<div className="flex flex-col bg-secondary flex-1 items-center p-1 m-1 w-full rounded">
									<h1 className="font-bold text-lg">{data.projectsCount}</h1>
									<span className="text-xs">Projects</span>
								</div>
							)}
							{Boolean(data.postsCount) && (
								<div className="flex flex-col bg-secondary flex-1 items-center p-1 m-1 rounded">
									<h1 className="font-bold text-lg">{data.postsCount}</h1>
									<span className="text-xs">Posts</span>
								</div>
							)}
						</div>
					</div>

					<div className="flex xs:flex sm:flex md:hidden lg:hidden xl:hidden flex-col w-full bg-default z-30 mb-2 shadow p-2">
						<div className="flex flex-col relative items-center">
							<img
								src={displayImage(data)}
								alt={data.username}
								title={data.username}
								className="bg-secondary rounded-full shadow-md"
								style={{
									height: 80,
									width: 80,
								}}
							/>
							<div className="flex flex-col items-center ml-2">
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
									<div className="flex items-center mt-2">
										<Button className="focus:outline-none flex items-center pr-1 rounded-md bg-secondary border-2 text-default-inverted">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="w-6 h-6 p-1"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
											<span className="text-sm">Edit Profile</span>
										</Button>
									</div>
								) : (
									<div className="flex items-center mt-2">
										<FollowAction {...data} hasLabel />
									</div>
								)}
							</div>
						</div>
					</div>

					<TabList className="w-full border-2 flex justify-center justify-start bg-default border-secondary-soft rounded-md text-default-inverted sticky top-0 z-30">
						<Tab className="flex flex-col items-center justify-center px-1 flex-1 text-center cursor-pointer opacity-75 text-default-inverted hover:bg-secondary hover:opacity-100 transition duration-150 easy-in-out ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
								/>
							</svg>
							<span className="font-bold font-xs capitalize hidden xs:hidden sm:hidden md:block lg:block xl:block">
								Timeline
							</span>
						</Tab>
						<Tab className="flex flex-col items-center justify-center px-1 flex-1 text-center cursor-pointer opacity-75 text-default-inverted hover:bg-secondary hover:opacity-100 transition duration-150 easy-in-out ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
								/>
							</svg>
							<span className="font-bold font-xs capitalize hidden xs:hidden sm:hidden md:block lg:block xl:block">
								Projects
							</span>
						</Tab>
						<Tab className="flex flex-col items-center justify-center p-1  flex-1 text-center cursor-pointer opacity-75 text-default-inverted hover:bg-secondary hover:opacity-100 transition duration-150 easy-in-out">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
								/>
							</svg>
							<span className="font-bold font-xs capitalize hidden xs:hidden sm:hidden md:block lg:block xl:block">
								Locations
							</span>
						</Tab>
					</TabList>

					<TabPanel className="flex flex-col w-full mt-2">
						<Timeline username={data.username} />
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
					<TabPanel className="mx-auto container">
						<>
							<div className="flex flex-col my-2">
								{JSON.stringify(data?.locations)}
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
				</div>
			</Tabs>
		</>
	);
}

export default UserProfileCard;
