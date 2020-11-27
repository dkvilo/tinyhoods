export default function PostActions(): JSX.Element {
	return (
		<div className="flex items-center py-2 justify-start rounded-b">
			<div className="flex items-center">
				<button className="bg-default p-2 rounded-full hover:bg-secondary focus:outline-none">
					<svg
						viewBox="0 0 23 23"
						strokeWidth="2"
						className="stroke-current h-6 w-6 text-default-inverted hover:text-red-400"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							fill="none"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						></path>{" "}
					</svg>
				</button>
				<span className="mx-1 text-default-inverted">100k</span>
			</div>
			<div className="flex items-center ml-1">
				<button className="bg-default p-2 rounded-full hover:bg-secondary focus:outline-none">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="stroke-current h-6 w-6 text-default-inverted hover:text-primary"
					>
						<circle cx="18" cy="5" r="3"></circle>
						<circle cx="6" cy="12" r="3"></circle>
						<circle cx="18" cy="19" r="3"></circle>
						<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
						<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
					</svg>
				</button>
			</div>
			<div className="flex items-start justify-start text-default-inverted text-sm">
				<button className="text-left bg-default p-2 rounded-full ml-1 focus:outline-none hover:text-primary">
					Add a Comment ...
				</button>
			</div>
		</div>
	);
}
