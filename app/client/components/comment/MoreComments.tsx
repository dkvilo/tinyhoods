import { FormEvent } from "react";

export default function ({
	count,
	onClick,
}: {
	count?: number;
	onClick?(event: FormEvent<any>): void;
}): JSX.Element {
	return (
		<button
			onClick={onClick}
			className="flex items-center p-1 rounded focus:outline-none"
		>
			<p className="text-primary text-sm opacity-75">
				Read More {count ? `${count}` : ""} Comment
			</p>
		</button>
	);
}
