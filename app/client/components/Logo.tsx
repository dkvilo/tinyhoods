import Link from "next/link";

export default function ({
	size = "big",
}: {
	size?: "small" | "big";
}): JSX.Element {
	return (
		<Link href="/">
			<figure className="cursor-pointer">
				<img
					className={`${size === "big" ? "w-16 h-16" : "w-10 h-10"}`}
					src="/th-logo.svg"
					alt="Tiny Hoods"
				/>
			</figure>
		</Link>
	);
}
