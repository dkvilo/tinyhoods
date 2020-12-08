import { isEmpty } from "ramda";
import React, { Fragment } from "react";
import Comment from "../comment";

export default function PostFooter({
	comments,
	onReply,
}: {
	comments: any;
	onReply?(comment: any): void;
}): JSX.Element {
	return (
		<>
			{comments.map((each: any, index: number) => (
				<Fragment key={each.id + index}>
					<Comment
						{...each}
						canReply
						isClickable
						onReply={(comment: any) => (event: any) => {
							if (onReply) onReply(comment);
						}}
					/>

					{each?.replies &&
						!isEmpty(each.replies) &&
						each.replies.map((reply: any) => (
							<div
								key={reply.id}
								className="mx-10 mb-2 w-auto border-l-2 border-secondary-soft"
							>
								<Comment {...reply} />
							</div>
						))}
				</Fragment>
			))}
		</>
	);
}
