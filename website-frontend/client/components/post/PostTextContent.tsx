export default function PostTextContent({
	content,
}: {
	content: string;
}): JSX.Element {
	return <p className="text-default-inverted text-sm py-1 px-1">{content}</p>;
}
