import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserTokenContext } from "../../context";
import UsersList from "../UsersList";

export default function (): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);
	const router = useRouter();

	return (
		<>
			<div className="w-full mt-4">
				<div className="sticky" style={{ top: 20 }}>
					<div className="flex flex-col">
						{loginState.isLogin && (
							<button
								onClick={() =>
									router.push("/", undefined, {
										shallow: true,
									})
								}
								className="focus:outline-none hover:text-primary hover:border-primary rounded-full mb-2 p-1 bg-default border-2 border-default-inverted font-bold text-default-inverted"
							>
								Home
							</button>
						)}
					</div>
					{loginState.isLogin && (
						<div className="">
							<div className="mb-1 flex items-center">
								<p className="cursor-pointer hover:text-primary text-default-inverted font-bold text-sm">
									New Members
								</p>
							</div>
							<UsersList />
						</div>
					)}
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
