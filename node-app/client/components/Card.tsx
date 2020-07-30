import React from "react";

interface Coordinates {
	latitude: number;
	longitude: number;
	accuracy?: number;
}

interface IProps {
	name: string;
	description: string;
	address: string;
	coordinates: Coordinates;
	cover?: string;
}

export default function ({
	name,
	description,
	address,
	coordinates,
	explorer,
	cover,
	onSelect,
}: IProps & any): JSX.Element {
	return (
		<div
			onClick={() => {
				onSelect(coordinates);
			}}
			className="p-4 bg-default shadow-md text-decoration-none rounded-lg text-default-inverted"
		>
			<div className="card">
				<h3 className="text-xl flex justify-between">
					{name} <span>&rarr;</span>
				</h3>
				<div className="flex">
					{/* {cover && (
						<div className="rounded-lg my-3 overflow-hidden">
							<img src={cover} alt={name} />
						</div>
					)} */}
					<p className="mt-2 text-sm rounded my-2">{description}</p>
				</div>
				<div className="mt-2 flex justify-between items-center">
					<div className="text-sm flex items-center">
						{/* <svg
							className="w-4 h-4 mr-1"
							version="1.1"
							id="Capa_1"
							x="0px"
							y="0px"
							viewBox="0 0 425.963 425.963"
						>
							<path
								d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
								className="active-path"
								fill="var(--color-default-inverted)"
							/>
						</svg> */}
						<span className="mr-1">Near,</span>
						<span>{address}</span>
					</div>
					{explorer && (
						<div className="flex items-center">
							<img
								src={`/api/avatar/twitter?username=${explorer.username}&size=small`}
								className="w-5 h-5 rounded-full border-2 border-default-inverted mr-1"
								alt={explorer.username}
							/>
							{/* <span className="text-default-inverted text-sm">
								{explorer.username}
							</span> */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
