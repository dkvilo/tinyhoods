import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserTokenContext } from "../../context";

export default function (): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);
	const router = useRouter();

	return (
		<>
			<div className="w-full mt-4">
				<div className="sticky" style={{ top: 20 }}>
					<div className="flex flex-col">
						<button
							onClick={() =>
								router.push("/?tab=feed", undefined, {
									shallow: true,
								})
							}
							className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
						>
							Home Page
						</button>
						{loginState.isLogin && (
							<button
								onClick={() =>
									router.push("/?tab=add-post", undefined, {
										shallow: true,
									})
								}
								className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
							>
								Publish Post
							</button>
						)}
						{loginState.isLogin && (
							<button
								onClick={() =>
									router.push("/?tab=new-project", undefined, {
										shallow: true,
									})
								}
								className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
							>
								Create Project
							</button>
						)}
						<p className="flex cursor-pointer items-center justify-center focus:outline-none rounded-full mb-2 p-1 bg-red-500 border-2 border-red-500 font-bold text-default">
							<Link href="/traveler">
								<span>Traveler Mode</span>
							</Link>
						</p>
					</div>
					<div className="">
						<div className="mb-1 flex items-center">
							<Link href="/ads">
								<p className="cursor-pointer hover:text-primary text-default-inverted font-bold text-sm">
									Sponsored
								</p>
							</Link>
						</div>
						<div className="flex items-center justify-center border border-secondary-soft bg-secondary rounded-md w-full h-64"></div>
					</div>
				</div>
			</div>
		</>
	);
}
