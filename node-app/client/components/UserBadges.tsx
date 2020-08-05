import React, { memo } from "react";
import { isMembershipExpired } from "../../shared/functions";

function UserBadges({ data }: any): JSX.Element {
	return (
		<>
			<h1 className="text-2xl text-default-inverted font-bold py-2">
				Badges And Achievements
			</h1>
			<div className="inline-flex items-center justify-start flex-wrap p-2 rounded-md overflow-x-auto">
				<img
					alt="One Year Club Member"
					className="w-16 h-16 p-2 mr-2 mb-2 bg-secondary shadow-md rounded-full"
					src="/badges/one-year-club.svg"
				/>
				{data.locationCount == 1 && (
					<img
						alt="Explorer"
						className="w-16 h-16 p-2 mr-2 mb-2 bg-secondary shadow-md rounded-full"
						src="/badges/explorer.svg"
					/>
				)}
				{!isMembershipExpired(data.membership.expiresAt) && (
					<img
						alt="Traveler Club Member"
						className="w-16 h-16 p-2 mr-2 mb-2 bg-secondary shadow-md rounded-full"
						src="/badges/premium.svg"
					/>
				)}
			</div>
		</>
	);
}

export default memo(UserBadges);
