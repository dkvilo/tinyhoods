import React, { useState } from "react";

import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";

export default function FollowAction({
	_following,
	username,
	hasLabel = false,
}: {
	_following: boolean;
	username: string;
	hasLabel?: boolean;
}): JSX.Element {
	const [isFollowing, setIsFollowing] = useState<boolean>(_following);

	const handleFollowActionSuccess = (status: boolean) => {
		setIsFollowing(status);
	};

	return (
		<>
			{isFollowing ? (
				<UnfollowButton
					onAction={handleFollowActionSuccess}
					username={username}
					hasLabel={hasLabel}
				/>
			) : (
				<FollowButton
					onAction={handleFollowActionSuccess}
					username={username}
					hasLabel={hasLabel}
				/>
			)}
		</>
	);
}
