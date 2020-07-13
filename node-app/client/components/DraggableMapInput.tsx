import React, { useRef, useEffect, useState, memo } from "react";
import mapboxgl from "mapbox-gl";

function DroppableMapInput({ activeCoordinates, onChange }: any): JSX.Element {
	const map = useRef<any>();
	const [myMap, setMyMap] = useState<any | null>(null);

	useEffect(() => {
		if (map?.current && activeCoordinates) {
			mapboxgl.accessToken =
				"pk.eyJ1IjoidHJ1eGEiLCJhIjoiY2s3eG81Z2s3MGRlcjNsczh3azFiMmhxNCJ9.UB2Wh6rWuC8D0aMRowgU9Q";
			setMyMap(
				new mapboxgl.Map({
					container: map.current.id,
					style: `mapbox://styles/mapbox/${false ? "dark-v10" : "streets-v10"}`, // stylesheet location
					center: [activeCoordinates.longitude, activeCoordinates.latitude], // starting position [lng, lat]
					zoom: 5,
					maxZoom: 15,
					minZoom: 4,
					pitch: 45,
					bearing: 0,
					antialias: true,
				})
			);
		}
	}, [map, activeCoordinates, setMyMap]);

	useEffect(() => {
		if (myMap !== null) {
			var el = document.createElement("div");
			el.className = "marker";
			var marker = new mapboxgl.Marker({
				element: el,
				draggable: true,
			})
				.setLngLat([activeCoordinates.longitude, activeCoordinates.latitude])
				.addTo(myMap);

			marker.on("dragend", () => {
				onChange(marker.getLngLat());
			});
		}
	}, [myMap]);

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
