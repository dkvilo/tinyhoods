import React from "react";
// TODO: (dkvilo) later fix interface issue, make it required
function EmptyCard({ message }: { message?: string }): JSX.Element {
	return (
		<div className="p-2 flex flex-col items-center justify-center bg-secondary rounded-md border">
			<figure className="w-64 h-64 mb-5">
				<img src="/no-data.svg" alt="There is nothing to show" />
			</figure>
			<h1 className="text-default-inverted text-md my-4 p-2 rounded w-full text-center">
				{message || "There is nothing to show"}
			</h1>
		</div>
	);
}

export default EmptyCard;
