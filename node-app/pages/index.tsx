import { useState } from "react";
import dynamic from "next/dynamic";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Grid from "../client/components/Grid";
import SEOHeader from "../client/components/SEOHeader";

const GET_LOCATIONS = gql`
	{
		getLocations {
			name
			address
			description
			cover
			coordinates {
				longitude
				latitude
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
	const { loading, data, error } = useQuery(GET_LOCATIONS, {
		fetchPolicy: "network-only",
	});

	const [activeCoordinates, setActiveCoordinates] = useState(
		() => !loading && !error && data.getLocations[0].coordinates
	);

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
