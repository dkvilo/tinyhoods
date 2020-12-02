import React, { Fragment } from "react";
import Comment from "../comment";

export default function PostFooter({
	comments,
}: {
	comments: any;
}): JSX.Element {
	return (
		<>
			{comments.map((each: any, index: number) => (
				<Fragment key={each.id + index}>
					<Comment {...each} isClickable />
				</Fragment>
			))}
		</>
	);
}
