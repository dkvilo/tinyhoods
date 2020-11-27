import Comment from "../comment";

function ReactCommentsButton(): JSX.Element {
	return (
		<button className="flex items-center p-1 rounded focus:outline-none">
			<p className="text-primary text-sm opacity-75">Read All 200 Comments</p>
		</button>
	);
}

export default function PostFooter(): JSX.Element {
	return (
		<>
			{Array(1)
				.fill(0)
				.map((each: any, index: number) => (
					<Comment
						author={{ username: `user${index}` }}
						content={"Beautiful Pictures ♥️"}
						key={index}
					/>
				))}
			<ReactCommentsButton />
		</>
	);
}
