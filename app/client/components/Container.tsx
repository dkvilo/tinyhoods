import React, { memo } from "react";

interface IProps {
	children: React.ReactChild;
}

function Container({ children }: IProps): JSX.Element {
	return (
		<div>
			<div className="h-auto mb-2 bg-default p-1 rounded shadow-md">
				{children}
			</div>
			<footer className="flex flex-col items-center p-2 mb-2 text-default-inverted flex justify-center bg-default rounded shadow-md">
				<a
					href="https://twitter.com/dkvilo"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm p-2 font-bold"
				>
					Follow Us on Twitter
				</a>
				<a
					href="https://twitter.com/dkvilo"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm p-2"
				>
					2020 &copy; TinyHoods.Net
				</a>
			</footer>
		</div>
	);
}

export default memo(Container);
