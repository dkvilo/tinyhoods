export default function PostLoader({
	index,
	border = true,
}: {
	index: number;
	border?: boolean;
}) {
	return (
		<div
			className={`mb-4 rounded p-1 ${border && "border border-secondary-soft"}`}
		>
			<div className="mb-3 flex items-center">
				<div className="w-10 h-10 bg-secondary-soft lazy__boy rounded-full"></div>
				<div className="ml-2">
					<div className="w-32 h-3 rounded bg-secondary-soft lazy__boy mb-2"></div>
					<div className="w-20 h-2 rounded bg-secondary-soft lazy__boy"></div>
				</div>
			</div>
			{index % 2 === 0 ? (
				<div className="flex">
					<div className="w-full h-64 rounded-md bg-secondary-soft lazy__boy mr-2"></div>
					<div className="w-full w-64 h-64 rounded-md bg-secondary-soft lazy__boy"></div>
				</div>
			) : (
				<div className="w-full h-64 rounded-md bg-secondary-soft lazy__boy mr-2"></div>
			)}
		</div>
	);
}
