export default function (): JSX.Element {
	return (
		<div className="flex items-start p-1 mt-2">
			<div className="flex items-start">
				<div className="w-8 h-8 bg-secondary rounded-full lazy__boy"></div>
				<div>
					<div className="w-20 h-3 bg-secondary rounded-md ml-1" />
					<div className="w-64 h-10 bg-secondary rounded-md ml-1 mt-1" />
					<div className="w-20 h-2 bg-secondary rounded-md ml-2 mt-1" />
				</div>
			</div>
		</div>
	);
}
