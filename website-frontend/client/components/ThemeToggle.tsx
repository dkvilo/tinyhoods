import React, { memo } from "react";

import { useThemeSwitch } from "../hooks";

function ThemeToggle(): JSX.Element {
	const [theme, switchTheme] = useThemeSwitch(false);

	return (
		<button
			className="cursor-pointer"
			style={{
				outline: "none",
			}}
		>
			<div
				className={`relative rounded-full w-12 h-6 transition duration-200 ease-linear ${
					theme ? "bg-green-400" : "bg-gray-400"
				}`}
			>
				<label
					htmlFor="toggle"
					className={`absolute left-0 bg-secondary border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer ${
						theme
							? "translate-x-full border-green-400"
							: "translate-x-0 border-gray-400"
					}`}
				/>

				<input
					type="checkbox"
					id="toggle"
					name="toggle"
					onClick={switchTheme as any}
					className="hidden appearance-none w-12 h-full active:outline-none focus:outline-none"
				/>
			</div>
		</button>
	);
}

export default memo(ThemeToggle);
