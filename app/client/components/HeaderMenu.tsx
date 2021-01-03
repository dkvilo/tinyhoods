import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";

export default function (): JSX.Element {
	const router = useRouter();

	return (
		<div className="flex items-center">
			<Button
				className={`focus:outline-none mr-2 px-2 py-1 rounded-full bg-red-500 py-1 flex text-white items-center`}
				onClick={() => {
					router.push("/?tab=add-post", undefined, {
						shallow: true,
					});
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					className="w-5 h-5"
					fill="currentColor"
				>
					<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
					<path
						fillRule="evenodd"
						d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
						clipRule="evenodd"
					/>
				</svg>
				<span className="font-bold mr-2 uppercase ml-1">New Post</span>
			</Button>
			<Button
				className={`focus:outline-none mr-2 px-2 py-1 rounded-full bg-green-500 py-1 flex text-white items-center`}
				onClick={() => {
					router.push("/?tab=new-project", undefined, {
						shallow: true,
					});
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					className="w-5 h-5"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
						clipRule="evenodd"
					/>
				</svg>
				<span className="font-bold mr-2 uppercase ml-1">New Project</span>
			</Button>
		</div>
	);
}
