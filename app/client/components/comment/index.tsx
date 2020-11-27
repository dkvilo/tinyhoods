import { IProps } from "./types";

export default function Comment({ content, author }: IProps): JSX.Element {
	return (
		<div className="flex items-center px-1">
			<span className="text-default-inverted font-bold">
				user{author.username}s
			</span>
			<p className="ml-1 text-default-inverted text-sm opacity-75">{content}</p>
		</div>
	);
}
