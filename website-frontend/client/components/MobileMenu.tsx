import { useRouter } from "next/router";
import React from "react";
import Logo from "./Logo";

export default function MobileMenu(): JSX.Element {
	const router = useRouter();

	return (
		<div className="mb-3 mt-1 bg-default text-default">
			<div className="flex items-center justify-evenly">
				{/* Add Post */}
				<button
					onClick={() =>
						router.push("/?tab=add-post", undefined, {
							shallow: true,
						})
					}
					className="p-1 focus:outline-none"
				>
					<svg
						className=" fill-current text-default-inverted w-8 h-8"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"></path>
					</svg>
				</button>

				{/* Home Button */}
				<button
					onClick={() => {
						router.push("/", undefined, {
							shallow: true,
						});
					}}
					className="p-1 rounded-full focus:outline-none"
				>
					<Logo size="small" />
				</button>

				{/* Search */}
				<button className="p-1 rounded-full focus:outline-none">
					<svg
						className=" fill-current text-default-inverted w-8 h-8"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="nonzero"
							d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"
						></path>{" "}
					</svg>
				</button>
			</div>
		</div>
	);
}
