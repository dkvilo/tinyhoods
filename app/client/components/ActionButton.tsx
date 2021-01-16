export default function ActionButton(
	props: React.ButtonHTMLAttributes<HTMLButtonElement> & { text: string }
): JSX.Element {
	return (
		<button
			className="bg-green-500 text-lg font-bold w-full p-2 text-default rounded-full focus:outline-none hover:bg-green-400 focus:bg-green-600 transition duration-150"
			{...props}
		>
			{props.text}
		</button>
	);
}
