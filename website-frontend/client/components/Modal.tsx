import React from "react";

export default function Modal({
	controller,
	title = "",
	children,
}: any): JSX.Element | null {
	const [isOpen, updateState] = controller as any;

	// useEffect(() => {
	// 	if (isOpen) {
	// 		document.body.style.overflow = "hidden";
	// 	}
	// 	return () => {
	// 		document.body.style.overflow = "scroll";
	// 	};
	// }, [isOpen]);

	if (isOpen) {
		return (
			<div
				className="bg-default sm:bg-default md:bg-default lg:bg-transparent xl:bg-transparent fixed w-full h-full top-0 left-0 flex items-center justify-center"
				style={{
					zIndex: 9999,
				}}
			>
				<div className="fixed w-full h-full z-50 overflow-y-auto">
					<div className="container mx-auto my-auto h-full text-left p-4 bg-gray-100 lg:shadow-md xl:shadow-md">
						<div className="flex justify-between items-center pb-2">
							<p className="text-2xl text-default-inverted font-bold uppercase">
								{title}
							</p>
							<div
								onClick={updateState as any}
								className="flex items-center justify-center w-8 h-8 rounded-full outline-none bg-secondary-soft cursor-pointer cursor-pointer flex flex-col items-center text-black text-sm z-50"
							>
								<svg
									className="fill-current text-default-inverted"
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 18 18"
								>
									<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
								</svg>
							</div>
						</div>

						{children}
					</div>
				</div>
			</div>
		);
	}

	return null;
}
