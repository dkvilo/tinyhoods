import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { useThemeSwitch } from "../hooks";
import { isEmpty } from "ramda";
import { FiltersContext } from "../context";

import { createElementFromHTML } from "../../shared/functions";

export default function ({
	data,
	activeCoordinates,
	focusOnOrigin,
}: any): JSX.Element {
	const map = useRef<any>();
	const [myMap, setMyMap] = useState<any | null>(null);
	const [theme] = useThemeSwitch(
		JSON.parse(localStorage.getItem("dark-mode") as any) || false
	);

	const { state: filtersState } = useContext<any>(FiltersContext);

	useEffect(() => {
		if (map?.current) {
			mapboxgl.accessToken =
				"pk.eyJ1IjoidHJ1eGEiLCJhIjoiY2s3eG81Z2s3MGRlcjNsczh3azFiMmhxNCJ9.UB2Wh6rWuC8D0aMRowgU9Q";
			setMyMap(
				new mapboxgl.Map({
					container: map.current.id,
					style: `mapbox://styles/mapbox/${theme ? "dark-v10" : "streets-v10"}`, // stylesheet location
					center: [
						!isEmpty(data)
							? data[0].geometry.coordinates[0]
							: !isEmpty(filtersState.coordinates)
							? filtersState.coordinates[0]
							: 0,
						!isEmpty(data)
							? data[0].geometry.coordinates[1]
							: !isEmpty(filtersState.coordinates)
							? filtersState.coordinates[1]
							: 0,
					], // starting position [lng, lat]

					zoom: 6,
					maxZoom: 20,
					minZoom: 10,
					pitch: 45,
					bearing: 0,
					antialias: true,
				})
			);
		}
	}, [map, setMyMap]);

	useEffect(() => {
		if (myMap !== null && activeCoordinates) {
			myMap.flyTo({
				center: [activeCoordinates[0], activeCoordinates[1]],
				zoom: 16,
			});
		}
	}, [myMap, activeCoordinates]);

	useEffect(() => {
		if (myMap !== null && filtersState?.coordinates) {
			myMap.flyTo({
				center: [
					filtersState.coordinates[0] || 0,
					filtersState.coordinates[1] || 0,
				],
				zoom: 16,
			});
		}
	}, [focusOnOrigin, myMap]);

	useEffect(() => {
		if (!isEmpty(filtersState.coordinates) && myMap) {
			new mapboxgl.Marker(
				createElementFromHTML(`
          <div class="user-pulse-box">
            <div class="user-pulse-css"></div>
          </div>
        `) as any
			)
				.setLngLat(filtersState.coordinates)
				.addTo(myMap)
				.setPopup(
					new mapboxgl.Popup({ offset: 20 }).setHTML(`
	          <div class="bg-default shadow-xl rounded-lg overflow-hidden">
	            <div class="p-2">
	              <p class="text-xl text-default-inverted">That's You!</p>
	            </div>
	          </div>
	        `)
				);
		}
	}, [filtersState.coordinates, myMap]);

	useEffect(() => {
		if (myMap !== null) {
			data.forEach((each: any) => {
				new mapboxgl.Marker(
					createElementFromHTML(`
            <div class="pulse-box">
              <div class="pulse-css"></div>
            </div>
          `) as any
				)
					.setLngLat([
						each.geometry.coordinates[0],
						each.geometry.coordinates[1],
					])
					.setPopup(
						new mapboxgl.Popup({ offset: 20, closeButton: false }).setHTML(
							`
                  <div class="bg-default shadow-xl rounded-lg overflow-hidden">
                    
                  ${
										each?.cover
											? `<div class="bg-cover bg-center h-32 p-2" style="background-image: url(${
													process.env.NODE_ENV === "development"
														? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo/${each.cover}`
														: `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${each.cover}`
											  })">
                    </div>`
											: ""
									}

                    <div class="p-2">
                        <p class="text-xl text-default-inverted">${
													each.name
												}</p>
                        <p class="mt-2 text-default-inverted">${
													each.description.substring(0, 200) + " ..."
												}</p>
                    </div>
                   
                    
                </div>
        
              `
						)
					)
					.addTo(myMap);
			});
		}
	}, [myMap, data]);

	return (
		<div
			className="w-full fixed bg-default"
			ref={map}
			id="map"
			style={{
				height: "100vh",
			}}
		/>
	);
}
