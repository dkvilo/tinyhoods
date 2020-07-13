import React from "react";
import { useThemeSwitch } from "../hooks";

export default function (
	props: React.InputHTMLAttributes<HTMLInputElement>
): JSX.Element {
	const [theme, switchTheme] = useThemeSwitch(false);

	return (
		<button
			onClick={switchTheme as any}
			className="outline-none w-10 h-10 ml-2 bg-default shadow-md rounded-lg p-1"
			style={{
				outline: "none",
			}}
		>
			{theme ? <img src="full-moon.svg" /> : <img src="sun.svg" />}
		</button>
	);
}
