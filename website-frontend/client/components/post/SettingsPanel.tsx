// TODO:(dkvilo) Add following functionalities [edit, delate, report]
// Involves Backend and Frontend
export default function PostSettingsPanel({
	editable,
}: {
	editable: boolean;
}): JSX.Element {
	return (
		<ul className="flex flex-col items-center justify-center text-default-inverted bg-default w-64 shadow-md rounded overflow-hidden">
			{editable ? (
				<>
					<li className="p-2 w-full hover:bg-secondary cursor-pointer hover:text-primary">
						Edit the post
					</li>
					<li className="p-2 w-full hover:bg-secondary cursor-pointer hover:text-primary">
						Delete the post
					</li>
				</>
			) : (
				<li className="p-2 w-full hover:bg-secondary cursor-pointer hover:text-primary">
					Report the post
				</li>
			)}
		</ul>
	);
}
