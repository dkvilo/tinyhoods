import Link from "next/link";
import React, { useState } from "react";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";

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
	_following,
	image,
	ableToFollow = true,
	hasGap = false,
}: IProps) {
	const [isFollowing, setIsFollowing] = useState<boolean>(_following);

	const handleFollowActionSuccess = (status: boolean) => {
		setIsFollowing(status);
	};

	return (
		<div
			key={username}
			className={`cursor-pointer hover:bg-secondary p-2 rounded bg-default border-b-2 border-secondary ${
				hasGap && "mb-2"
			}`}
		>
			<div className="flex items-center justify-between">
				<Link href={`/${username}`}>
					<div className="flex items-center">
						<img
							src={`${
								image
									? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${image}`
									: `/api/avatar/twitter?username=${username}`
							}`}
							alt={username}
							className="w-12 h-12 rounded-full border-2 border-default-inverted bg-secondary-soft"
						/>
						<div className="flex flex-col ml-2">
							<span className="text-default-inverted text-lg">{name}</span>
							<span className="text-default-inverted text-sm">@{username}</span>
						</div>
					</div>
				</Link>

				{ableToFollow && (
					<>
						{isFollowing ? (
							<UnfollowButton
								onAction={handleFollowActionSuccess}
								username={username}
							/>
						) : (
							<FollowButton
								onAction={handleFollowActionSuccess}
								username={username}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default UserListItem;
