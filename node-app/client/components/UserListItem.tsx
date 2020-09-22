import Link from "next/link";
import React from "react";
import FollowButton from "./FollowButton";

interface IProps {
	username: string;
	name: string;
	avatar?: string;
	_following: boolean;
	ableToFollow: boolean;
	hasGap?: boolean;
}

function UserListItem({
	username,
	name,
	_following,
	ableToFollow = true,
	hasGap = false,
}: IProps) {
	return (
		<div
			key={username}
			className={`cursor-pointer hover:bg-secondary p-2 rounded bg-default border-b-2 border-secondary ${
				hasGap && "mb-2"
			}`}
		>
			<Link href={`/${username}`}>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<img
							src={`/api/avatar/twitter?username=${username}`}
							alt={username}
							className="w-12 h-12 rounded-full border-2 border-default-inverted bg-secondary-soft"
						/>
						<div className="flex flex-col ml-2">
							<span className="text-default-inverted text-lg">{name}</span>
							<span className="text-default-inverted text-sm">@{username}</span>
						</div>
					</div>
					{ableToFollow && (
						<FollowButton _following={_following} username={username} />
					)}
				</div>
			</Link>
		</div>
	);
}

export default UserListItem;
