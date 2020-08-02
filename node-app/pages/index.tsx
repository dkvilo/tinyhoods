import { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { isEmpty } from "ramda";

import Grid from "../client/components/Grid";
import SEOHeader from "../client/components/SEOHeader";
import { FiltersContext } from "../client/context";

import getLocationService from "../client/services/geoLocation";

const GET_LOCATIONS = gql`
	query getLocations($data: GetLocationInputData!) {
		getLocations(data: $data) {
			id
			name
			address
			description
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

	const { loading, data, error } = useQuery(GET_LOCATIONS, {
		fetchPolicy: "network-only",
		variables: {
			data: {
				coordinates: !isEmpty(filtersState.coordinates)
					? filtersState.coordinates
					: [],
				// convert distance (km) to (m)
				maxDistance: parseFloat(filtersState.maxDistance) * 1000,
			},
		},
	});

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

	return (
		<div className=" w-full h-screen overflow-x-scroll">
			<SEOHeader title="TinyHoods" description=" - Explore tiny world" />

			{!loading && !error && (
				<MapCSR
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
			</div>

			<main
				className="relative mx-auto flex flex-col xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row bg-transparent"
				style={{
					top: "70vh",
					width: "100%",
				}}
			>
				<div
					className="mx-auto w-full xs:w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2"
					style={{
						zIndex: 47,
					}}
				>
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
