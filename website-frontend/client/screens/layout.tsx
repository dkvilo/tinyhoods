import React, { useContext } from "react";
import { UserTokenContext } from "../context";

interface IProps {
	left: JSX.Element;
	right: JSX.Element;
	center: JSX.Element;
	mobile?: JSX.Element;
}

export default function Layout({
	left,
	right,
	center,
	mobile,
}: IProps): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);

	return (
		<>
			<div className="flex container mx-auto">
				{/* Left */}
				<div className="w-1/4 hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex px-5">
					{left}
				</div>
				{/* [/Left] */}

				{/* Content */}
				<div className="w-full xs:w-full sm:w-full md:w-full lg:w-2/3 xl:w-2/4  mb-20 xs:mb-20 sm:mb-20 md:mb-20 lg:mb-2 xl:mb-2">
					{center}
				</div>
				{/* [/Content]  */}

				{/* Right */}
				<div className="w-1/4 hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex px-5">
					{right}
				</div>
				{/* [/Right] */}
			</div>
			{/* Mobile Menu */}
			{mobile && loginState.isLogin && (
				<div className="border-t-2 w-full bg-default fixed bottom-0 block xs:block sm:block md:block lg:hidden xl:hidden">
					{mobile}
				</div>
			)}
		</>
	);
}
