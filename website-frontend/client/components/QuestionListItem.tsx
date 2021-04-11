import React, { memo } from "react";

interface IProps {
	content: string;
	location: any;
	author: any;
}

function QuestionListItem({ content, location, author }: IProps) {
	return (
		<div className="border-b-2 border-secondary bg-default p-2 hover:bg-secondary">
			<div className="flex items-center justify-between">
				<div className="flex items-start">
					<img
						src={
							author.image
								? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${author.image}`
								: `/api/avatar/twitter?username=${author.username}`
						}
						alt={author.username}
						className="w-8 h-8 rounded-full border-2 border-default-inverted bg-secondary-soft"
						style={{
							width: 24,
							height: 24,
						}}
					/>
					<div className="flex flex-col justify-start ml-2">
						<div className="flex">
							<span className="text-primary mb-1">@{author.username}</span>
						</div>
						<p className="px-2 py-2 rounded-b-lg rounded-r-lg bg-primary text-default w-auto">
							{content}
						</p>
						<div className="flex items-center text-primary text-xs mt-2">
							<svg
								className="w-3 h-3 mr-1"
								version="1.1"
								id="Capa_1"
								x="0px"
								y="0px"
								viewBox="0 0 425.963 425.963"
							>
								<path
									d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
									className="active-path"
									fill="var(--color-primary)"
								/>
							</svg>
							<span>Near,</span>
							<span className="ml-1">{location.name}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(QuestionListItem);
