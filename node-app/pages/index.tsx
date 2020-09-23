import { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { isEmpty } from "ramda";

import Grid from "../client/components/Grid";
import SEOHeader from "../client/components/SEOHeader";

import {
	FiltersContext,
	UserTokenContext,
	GQLErrorContext,
} from "../client/context";

import getLocationService from "../client/services/geoLocation";
import Button from "../client/components/Button";

const GET_LOCATIONS = gql`
	query getLocations($data: GetLocationInputData!) {
		getLocations(data: $data) {
			id
			name
			address
			description
			keywords {
				name
			}
			landform {
				name
			}
			cover
			explorer {
				username
				name
			}
			geometry {
				coordinates
				type
			}
		}
	}
`;

const MapCSR = dynamic(
	() => import("../client/components/Map").then((mod) => mod.default) as any,
	{
		ssr: false,
	}
) as any;

const HeaderCSR = dynamic(
	() => import("../client/components/Header").then((mod) => mod.default) as any,
	{
		ssr: false,
	}
) as any;

const TabsContentCSR = dynamic(
	() =>
		import("../client/components/TabsContent").then(
			(mod) => mod.default
		) as any,
	{
		ssr: false,
	}
) as any;

export default function Home() {
	const { state: filtersState, dispatch: filterDispatcher } = useContext<any>(
		FiltersContext
	);

	const { state: loginState } = useContext<any>(UserTokenContext);

	const { loading, data, error } = useQuery(GET_LOCATIONS, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				coordinates: !isEmpty(filtersState.coordinates)
					? filtersState.coordinates
					: [],
				// convert distance (km) to (m)
				maxDistance: parseFloat(filtersState.maxDistance) * 1000,
				token: loginState.token,
			},
		},
	});

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);

	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Tinyhoods",
					error: error,
				},
			});
		}
	}, [error, errorDispatcher]);

	const [activeCoordinates, setActiveCoordinates] = useState(null);

	useEffect(() => {
		(async () => {
			const {
				coords: { latitude, longitude },
			}: any = await getLocationService({
				watch: false,
				enableHighAccuracy: true,
			} as any);
			if (longitude && latitude) {
				filterDispatcher({
					type: "SET_COORDINATES",
					payload: [longitude, latitude],
				});
			}
		})();
	}, []);

	const [focusOnOrigin, setFocusOnOrigin] = useState<boolean>(false);

	const focusMyLocationOnMap = () => {
		setFocusOnOrigin(!focusOnOrigin);
	};

	return (
		<div className=" w-full h-screen overflow-x-scroll">
			<SEOHeader title="TinyHoods" description=" - Explore tiny world" />

			{!loading && !error && (
				<MapCSR
					focusOnOrigin={focusOnOrigin}
					activeCoordinates={activeCoordinates}
					data={data.getLocations}
				/>
			)}

			<div
				className="relative rounded-md top-0 px-4 mt-6"
				style={{
					zIndex: 8888,
				}}
			>
				<HeaderCSR />
				{filtersState.selectedLocationData?.id && (
					<div className="container mx-auto flex items-center mt-3 justify-between px-3 rounded-full bg-secondary text-primary shadow-md w-auto">
						<div className="flex items-center">
							<svg
								className="w-3 h-3 mr-1"
								version="1.1"
								id="Capa_1"
								x="0px"
								y="0px"
								viewBox="0 0 425.963 425.963"
							>
								<path
									d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
									className="active-path"
									fill="var(--color-primary)"
								/>
							</svg>
							<span className="text-sm">
								{filtersState.selectedLocationData.name}
							</span>
						</div>

						<Button
							className="p-1 uppercase text-red-500 transform transition-all duration-300 scale-100 hover:scale-95"
							onClick={() => {
								filterDispatcher({
									type: "CLEAR_SELECTED_LOCATION",
								});
							}}
						>
							Clear
						</Button>
					</div>
				)}
			</div>

			<main
				className="relative mx-auto flex flex-col xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row bg-transparent"
				style={{
					top: "60vh",
					width: "100%",
				}}
			>
				<div
					className="mx-auto w-full xs:w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2"
					style={{
						zIndex: 47,
					}}
				>
					<div
						className="container mx-auto relative"
						style={{
							width: 50,
							zIndex: 8888,
						}}
					>
						<div className="">
							<Button
								onClick={focusMyLocationOnMap}
								className="text-primary p-2 bg-default rounded-full flex shadow-md"
							>
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
					</div>

					<Grid>
						<TabsContentCSR
							{...{ loading, data, error }}
							onFocus={(coordinates: any) => {
								setActiveCoordinates(coordinates);
							}}
						/>
					</Grid>
				</div>
			</main>
		</div>
	);
}
