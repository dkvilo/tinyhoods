import React, { useRef, useEffect, useState, memo } from "react";
import mapboxgl from "mapbox-gl";

import { createElementFromHTML } from "../../shared/functions";

function DroppableMapInput({ activeCoordinates, onChange }: any): JSX.Element {
	const map = useRef<any>();
	const [myMap, setMyMap] = useState<any | null>(null);

	useEffect(() => {
		if (map?.current && activeCoordinates) {
			mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN as string;
			setMyMap(
				new mapboxgl.Map({
					container: map.current.id,
					style: `mapbox://styles/mapbox/${false ? "dark-v10" : "streets-v10"}`, // stylesheet location
					center: [activeCoordinates[0], activeCoordinates[1]], // starting position [lng, lat]
					zoom: 15,
					maxZoom: 15,
					minZoom: 4,
					// pitch: 45,
					bearing: 0,
					antialias: true,
				})
			);
		}
	}, [map, activeCoordinates, setMyMap]);

	useEffect(() => {
		if (myMap !== null) {
			var marker = new mapboxgl.Marker({
				draggable: true,
				element: createElementFromHTML(`
          <div class="user-pulse-box">
            <div class="user-pulse-css"></div>
          </div>
        `) as any,
			})
				.setLngLat([activeCoordinates[0], activeCoordinates[1]])
				.addTo(myMap);

			marker.on("dragend", () => {
				onChange(marker.getLngLat());
			});
		}
	}, [myMap, activeCoordinates]);

	return (
		<div
			className="rounded-md h-32 bg-default"
			ref={map}
			id="mapAsInput"
			style={{
				height: "30vh",
			}}
		/>
	);
}

export default memo(DroppableMapInput);
