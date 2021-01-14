import Link from "next/link";
import React from "react";
import AuthCard from "../../components/AuthCard";
import LatestUsers from "../../components/LatestUsers";
import Logo from "../../components/Logo";

export default function (): JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-secondary">
			<div className="flex container h-auto">
				<div className="w-full sm:w-full shadow-lg my-2 mx-4 rounded-md bg-default md:w-1/2 lg:w-1/3 xl:w-1/3 flex flex-col p-2">
					<div className="flex items-center justify-center my-3">
						<Logo />
					</div>
					<LatestUsers />
					<p className="text-default-inverted text-sm px-2 mb-3 text-center">
						Tiny Hoods is a community, where tiny house owners can share their
						builds, get inspired, gain friends, and explore new places
					</p>
					<AuthCard />
				</div>
				<div className="w-full shadow-lg my-2 rounded-md bg-default hidden sm:flex md:flex lg:flex xl:flex flex-col">
					<figure className="object-cover">
						<img
							className="rounded-t-md"
							src="https://images.unsplash.com/photo-1519981132-08920a1840e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
							alt="Welcome to Tinyhoods.Net"
							title="Welcome to Tinyhoods.Net"
						/>
					</figure>
					<div className="flex flex-col items-start my-3 p-2">
						<ul className="flex items-start justify-start">
							<li className="text-default-inverted font-bold mr-2 hover:underline">
								<Link href="/ads">
									<a>Ads</a>
								</Link>
							</li>
							<li className="text-default-inverted font-bold mr-2 hover:underline">
								<Link href="/privacy">
									<a>Help</a>
								</Link>
							</li>
							<li className="text-default-inverted font-bold mr-2 hover:underline">
								<Link href="/privacy">
									<a>Privacy</a>
								</Link>
							</li>
							<li className="text-default-inverted font-bold mr-2 hover:underline">
								<a href="https://twitter.com/dkvilo">Contact</a>
							</li>
						</ul>
						<p className="text-default-inverted text-sm italic">
							2021 &copy; All Rights Received.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
