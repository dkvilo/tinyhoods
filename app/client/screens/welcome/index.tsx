import Link from "next/link";
import React from "react";
import AuthCard from "../../components/AuthCard";
import LatestUsers from "../../components/LatestUsers";
import Logo from "../../components/Logo";

export default function (): JSX.Element {
	return (
		<div className="mx-auto flex flex-col items-center justify-center h-screen bg-secondary">
			<div className="container flex p-2 bg-default shadow-md rounded-md">
				<div className="w-full xs:w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mr-2 max-w-md">
					<div className="flex items-center justify-center my-3">
						<Logo />
					</div>

					<LatestUsers />

					<p className="text-default-inverted text-sm px-2 mb-2 text-center">
						Tiny Hoods is a community, where tiny house owners can share their
						builds, get inspired, gain friends, and explore new places
					</p>

					<div className="p-2">
						<AuthCard />
					</div>
				</div>

				<div className="w-full hidden xs:hidden sm:hidden md:block lg:block xl:block">
					<div className="flex flex-col items-center relative">
						<figure className="object-cover">
							<img
								className="rounded-md"
								src="https://images.unsplash.com/photo-1519981132-08920a1840e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
								alt="Welcome to Tinyhoods.Net"
								title="Welcome to Tinyhoods.Net"
							/>
						</figure>
					</div>
				</div>
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
