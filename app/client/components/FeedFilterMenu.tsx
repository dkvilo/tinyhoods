import React, { useContext } from "react";

import { FiltersContext } from "../context";

import Button from "./Button";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

export default function (): JSX.Element {
	const { dispatch: filtersDispatcher, state: filtersState } = useContext<any>(
		FiltersContext
	);

	return (
		<div className="flex flex-1 items-center justify-between">
			<div className="w-auto hidden xs:hidden sm:hidden md:hidden lg:block xl:block">
				<div className="flex items-center justify-evenly">
					<Logo size="small" />
					<span className="ml-4">
						<SearchInput placeholder="Search ..." />
					</span>
				</div>
			</div>
			<div className="flex items-center">
				<Button
					className={`text-sm focus:outline-none p-2 flex bg-default text-default-inverted ${
						filtersState.feedType === "private" && "border-b-2 border-red-500"
					}`}
					onClick={() => {
						filtersDispatcher({
							type: "SET_FEED_TYPE",
							payload: "private",
						});
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						className="w-5 h-5"
						fill="currentColor"
					>
						<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
					</svg>
					<span className="font-bold uppercase ml-1">My Feed</span>
				</Button>
				<Button
					className={`text-sm focus:outline-none ml-2 p-2 flex bg-default text-default-inverted ${
						filtersState.feedType === "public" && "border-b-2 border-red-500 "
					}`}
					onClick={() => {
						filtersDispatcher({
							type: "SET_FEED_TYPE",
							payload: "public",
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
							d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
							clipRule="evenodd"
						/>
					</svg>
					<span className="font-bold mr-2 uppercase">Explore</span>
				</Button>
			</div>
		</div>
	);
}
