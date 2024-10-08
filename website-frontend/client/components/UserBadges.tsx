import React, { memo } from "react";
import { isMembershipExpired } from "../../shared/functions";

function UserBadges({ data }: any): JSX.Element {
	return (
		<div className="flex flex-col items-start">
			<h1 className="text-xl text-default-inverted font-bold py-2">
				Achievements
			</h1>
			<div className="inline-flex items-center justify-start flex-wrap p-2 rounded-md overflow-x-auto">
				<img
					alt="One Year Club Member"
					className="w-16 h-16 p-2 mr-2 mb-2 bg-default shadow-md rounded-full"
					src="/badges/one-year-club.svg"
				/>
				{data.locationCount == 1 && (
					<img
						alt="Explorer"
						className="w-16 h-16 p-2 mr-2 mb-2 bg-default shadow-md rounded-full"
						src="/badges/explorer.svg"
					/>
				)}
				{!isMembershipExpired(data.membership.expiresAt) && (
					<img
						alt="Traveler Club Member"
						className="w-16 h-16 p-2 mr-2 mb-2 bg-default shadow-md rounded-full"
						src="/badges/premium.svg"
					/>
				)}
			</div>
		</div>
	);
}

export default memo(UserBadges);
