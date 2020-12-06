import React, { useContext } from "react";
import Button from "./Button";
import { FiltersContext } from "../context";

interface IProps {
	name: string;
	description: string;
	address: string;
	coordinates: [Number];
	cover?: string;
}

export default function ({
	id,
	name,
	description,
	address,
	geometry: { coordinates },
	explorer,
	cover,
	onSelect,
}: IProps & any): JSX.Element {
	const { state: filterState, dispatch: filterDispatcher } = useContext<any>(
		FiltersContext
	);
	const openMap = () => {
		window.open(
			`http://maps.google.com/?saddr=${filterState.coordinates[1]},${filterState.coordinates[0]}&daddr=${coordinates[1]},${coordinates[0]}&dirflg=d`,
			"_blank"
		);
	};

	return (
		<div
			onClick={() => {
				onSelect(coordinates);
				filterDispatcher({
					type: "SET_SELECTED_LOCATION",
					payload: {
						name,
						id,
						address,
					},
				});
			}}
			className="p-4 bg-default text-decoration-none text-default-inverted border-b-2 border-secondary hover:bg-secondary"
		>
			<div className="card">
				<div className="flex justify-between items-center">
					<h3 className="text-xl">{name}</h3>
					<Button onClick={openMap}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 fill-current"
							viewBox="0 0 24 24"
						>
							<g>
								<rect width="24" height="24" opacity="0" />
								<path d="M13.67 22h-.06a1 1 0 0 1-.92-.8l-1.54-7.57a1 1 0 0 0-.78-.78L2.8 11.31a1 1 0 0 1-.12-1.93l16-5.33A1 1 0 0 1 20 5.32l-5.33 16a1 1 0 0 1-1 .68z" />
							</g>
						</svg>
					</Button>
				</div>
				<div className="flex flex-col">
					{cover && (
						<div className="rounded-lg my-3 overflow-hidden">
							<img
								src={
									process.env.NODE_ENV === "development"
										? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo/${cover}`
										: `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${cover}`
								}
								alt={name}
							/>
						</div>
					)}
					<p className="mt-2 text-sm rounded my-2">{description}</p>
				</div>
				<div className="mt-2 flex justify-between items-center">
					<div className="text-sm flex items-center">
						<svg
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
						</svg>
						<span className="mr-1">Near,</span>
						<span>{address}</span>
					</div>
					{explorer && (
						<div className="flex items-center">
							<img
								src={
									explorer.image
										? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo/${explorer.image}`
										: explorer.avatar
										? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${explorer.image}`
										: explorer.avatar
								}
								className="w-5 h-5 rounded-full border-2 border-default-inverted mr-1"
								alt={explorer.username}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
