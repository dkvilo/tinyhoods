import Link from "next/link";
import React from "react";
import FollowAction from "./FollowAction";

import { getImageOrAvatarPath } from "../../shared/utils";

interface IProps {
	username: string;
	name: string;
	image: string;
	avatar?: string;
	_following: boolean;
	ableToFollow: boolean;
	hasGap?: boolean;
}

function UserListItem({
	username,
	name,
	_following = false,
	image,
	avatar,
	ableToFollow = true,
	hasGap = false,
}: IProps) {
	return (
		<div
			key={username}
			className={`cursor-pointer hover:bg-secondary rounded-md p-2 bg-default border mb-1 border-secondary-soft ${
				hasGap && "mb-2"
			}`}
		>
			<div className="flex items-center justify-between">
				<Link href={`/${username}`}>
					<div className="flex items-center">
						<img
							src={getImageOrAvatarPath(image, avatar as any)}
							alt={username}
							className="w-12 h-12 rounded-full border-2 border-secondary-soft bg-secondary-soft"
						/>
						<div className="flex flex-col ml-2">
							<span className="text-default-inverted">{name}</span>
							<span className="text-default-inverted text-xs">@{username}</span>
						</div>
					</div>
				</Link>

				{ableToFollow && (
					<FollowAction _following={_following} username={username} />
				)}
			</div>
		</div>
	);
}

export default UserListItem;
