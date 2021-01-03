import Link from "next/link";
import React from "react";

export default function (): JSX.Element {
	return (
		<div className="mx-1 my-3">
			<h1 className="text-default-inverted font-bold text-2xl my-2">
				Welcome to Tinyhoods.Net
			</h1>
			<div className="flex items-center">
				<figure className="p-2">
					<img
						className="w-64 h-64"
						src="/cabin.svg"
						alt="Welcome to Tinyhoods.Net"
						title="Welcome to Tinyhoods.Net"
					/>
				</figure>
				<p className="text-default-inverted text-sm my-2">
					Tiny Hoods is a Community for Tiny house owners, where you can share
					your build, get inspired, gain friends and explore favorite places to
					park!
				</p>
			</div>

			<hr className="my-3" />
			<ul className="flex items-center justify-start">
				<li className="text-default-inverted font-bold mr-2 hover:underline">
					<Link href="/ads">
						<a>Advertisement</a>
					</Link>
				</li>
				<li className="text-default-inverted font-bold mr-2 hover:underline">
					<Link href="/support">
						<a>Help</a>
					</Link>
				</li>
				<li className="text-default-inverted font-bold mr-2 hover:underline">
					<Link href="/pp">
						<a>Privacy Policy</a>
					</Link>
				</li>
				<li className="text-default-inverted font-bold mr-2 hover:underline">
					<Link href="/faq">F.A.Q</Link>
				</li>
				<li className="text-default-inverted font-bold mr-2 hover:underline">
					<a href="https://twitter.com/dkvilo">Contact</a>
				</li>
			</ul>
			<p className="text-default-inverted text-sm italic">
				2021 &copy; All Rights Received. Tiny Hoods LLC
			</p>
		</div>
	);
}
