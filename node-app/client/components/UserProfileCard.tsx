import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

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
						src={
							data?.image
								? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${data.image}`
								: data.avatar
						}
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
						{/* <Tab className="p-2 text-center">
							<span className="font-bold">{data.questionsCount}</span> Questions
						</Tab> */}
					</TabList>

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

					{/* <TabPanel className="mx-6 container">
						<>
							<div className="p-2 flex flex-col bg-indigo-500 w-full rounded-md">
								{data?.questions &&
									data.questions.map((question: any) => (
										<QuestionListItem key={question.id} {...question} />
									))}
							</div>
						</>
					</TabPanel> */}
				</div>
			</Tabs>
		</>
	);
}

export default UserProfileCard;
