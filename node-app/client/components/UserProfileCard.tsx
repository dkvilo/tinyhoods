import React from "react";
import Button from "./Button";

function UserProfileCard({ data }: any) {
	return (
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
				<p className="text-2xl font-bold text-default-inverted">{data.name}</p>
				<p className="text-md text-default-inverted">@{data.username}</p>
				<p className="text-sm text-primary p-1">{data.link}</p>
				<p className="text-sm text-default-inverted p-1">{data.about}</p>
			</div>

			<div className="flex items-center justify-center p-1 bg-secondary text-default-inverted w-full">
				<div className="p-2">
					<span className="font-bold">100K</span> Followers
				</div>
				<div className="p-2">
					<span className="font-bold">25</span> Following
				</div>
				<div className="p-2">
					<span className="font-bold">0</span> Questions
				</div>
			</div>

			<div className="flex items-center justify-center p-2">
				<Button className="px-2 text-default-inverted bg-default border-2 rounded-md hover:bg-primary hover:text-default hover:border-primary">
					Follow @{data.username}
				</Button>
			</div>

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
					<p className="text-md text-default-inverted">Private Profile</p>
					<p className="text-xs text-default-inverted">
						@{data.username} doesn't want to share private information to
						everybody
					</p>
				</div>
			)}
		</div>
	);
}

export default UserProfileCard;
