import Link from "next/link";

export default function Logo({
	size = "big",
}: {
	size?: "small" | "big" | "xs";
}): JSX.Element {
	return (
		<Link href="/">
			<figure className="cursor-pointer">
				<img
					className={`${size === "big" && "w-16 h-16"} ${
						size === "small" && "w-10 h-10"
					} ${size === "xs" && "w-6 h-6"}`}
					src="/th-logo.svg"
					alt="Tiny Hoods"
				/>
			</figure>
		</Link>
	);
}
