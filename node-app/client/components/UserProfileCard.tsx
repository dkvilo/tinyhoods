import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import FollowButton from "./FollowButton";

import UserBadges from "./UserBadges";
import UserListItem from "./UserListItem";

function UserProfileCard({ data }: any) {
	return (
		<>
			<Tabs
				selectedTabClassName="text-primary"
				disabledTabClassName="bg-secondary text-default-inverted"
			>
				<div className="flex flex-col items-center justify-center w-full xs:w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mx-auto">
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
						<p className="text-2xl font-bold text-default-inverted">
							{data.name}
						</p>
						<p className="text-md text-default-inverted">@{data.username}</p>
						<p className="text-sm text-primary p-1">{data.link}</p>
						<p className="text-sm text-default-inverted p-1">{data.about}</p>
					</div>

					<TabList className="flex justify-center items-end p-1 text-default-inverted">
						<Tab className="p-2 mr-1 text-center items-center">
							<span className="font-bold">About</span>
						</Tab>
						<Tab className="p-2 mr-1 text-center">
							<span className="font-bold">{data.followersCount}</span> Follower
						</Tab>
						<Tab className="p-2 mr-1 text-center">
							<span className="font-bold">{data.followingCount}</span> Following
						</Tab>
						<Tab className="p-2 text-center">
							<span className="font-bold">{data.questionsCount}</span> Questions
						</Tab>
					</TabList>

					<div className="absolute bottom-0 p-2 flex items-center justify-center bg-red-400 w-full">
						<FollowButton username={data.username} />
					</div>

					<TabPanel className="mx-6 container">
						<>
							<div className="flex flex-col flex-1 w-full bg-green-300 p-2 rounded-md">
								{data.isPrivate && (
									<div className="flex flex-col items-center justify-center m-5">
										<svg
											width="32"
											height="32"
											viewBox="0 0 512 512"
											className="inline-block fill-current h-20 w-20 text-default-inverted"
										>
											<path d="m64 496l0-256 48 0 0-80c0-71 57-128 128-128l16 0c71 0 128 57 128 128l0 80 48 0 0 256z m172-131l-12 83 48 0-12-83c12-5 20-17 20-30 0-18-14-32-32-32-18 0-32 14-32 32 0 13 8 25 20 30z m100-197c0-49-39-88-88-88-49 0-88 39-88 88l0 72 176 0z"></path>
										</svg>
										<p className="text-md text-default-inverted">
											Private Profile
										</p>
										<p className="text-xs text-default-inverted">
											@{data.username} doesn't want to share private information
											to everybody
										</p>
									</div>
								)}

								<UserBadges data={data} />
							</div>
						</>
					</TabPanel>

					<TabPanel className="mx-6 container">
						<>
							<div className="flex flex-col flex-1 w-full bg-primary p-2 rounded-md">
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

					<TabPanel className="mx-6 container">
						<>
							<div className="p-2 flex flex-col flex-1 bg-warning w-full p-2 rounded-md">
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

					<TabPanel className="mx-6 container">
						<>
							<div className="p-2 flex flex-col bg-indigo-500 w-full rounded-md">
								{data?.questions &&
									data.questions.map((question: any) => {
										return (
											<div
												key={question.content}
												className="border-b-2 border-secondary bg-default p-2 hover:bg-secondary"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-start">
														<img
															src={`/api/avatar/twitter?username=${data.username}`}
															alt={data.username}
															className="w-8 h-8 rounded-full border-2 border-default-inverted bg-secondary-soft"
														/>
														<div className="flex flex-col justify-start ml-2">
															<div className="flex">
																<span className="text-default-inverted mb-1">
																	{data.name}
																</span>
															</div>
															<p className="px-6 py-2 rounded-b-full rounded-r-full bg-primary text-default">
																{question.content}
															</p>
															{/* <div className="flex items-center text-primary text-xs mt-2">
																<svg
																	className="w-3 h-3 mr-1"
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
																<span>Near,</span>
																<span className="ml-1">
																	{question.location.name}
																</span>
																<span className="ml-2">
																	{question.author.username}
																</span>
															</div> */}
														</div>
													</div>
												</div>
											</div>
										);
									})}
							</div>
						</>
					</TabPanel>
				</div>
			</Tabs>
		</>
	);
}

export default UserProfileCard;
