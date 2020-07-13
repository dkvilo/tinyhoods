import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useThemeSwitch } from "../hooks";

export default function ({ data, activeCoordinates }: any): JSX.Element {
	const map = useRef<any>();
	const [myMap, setMyMap] = useState<any | null>(null);
	const [theme] = useThemeSwitch(
		JSON.parse(localStorage.getItem("dark-mode") as any) || false
	);

	useEffect(() => {
		if (map?.current && data) {
			mapboxgl.accessToken =
				"pk.eyJ1IjoidHJ1eGEiLCJhIjoiY2s3eG81Z2s3MGRlcjNsczh3azFiMmhxNCJ9.UB2Wh6rWuC8D0aMRowgU9Q";
			setMyMap(
				new mapboxgl.Map({
					container: map.current.id,
					style: `mapbox://styles/mapbox/${theme ? "dark-v10" : "streets-v10"}`, // stylesheet location
					center: [data[0].coordinates.longitude, data[0].coordinates.latitude], // starting position [lng, lat]
					zoom: 5,
					maxZoom: 15,
					minZoom: 4,
					pitch: 45,
					bearing: 0,
					antialias: true,
				})
			);
		}
	}, [map, data, setMyMap]);

	useEffect(() => {
		if (myMap !== null && activeCoordinates) {
			myMap.flyTo({
				center: [activeCoordinates.longitude, activeCoordinates.latitude],
				zoom: 9,
			});
		}
	}, [myMap, activeCoordinates]);

	useEffect(() => {
		if (myMap !== null) {
			data.forEach((each: any) => {
				var el = document.createElement("div");
				el.className = "marker";
				new mapboxgl.Marker(el)
					.setLngLat([each.coordinates.longitude, each.coordinates.latitude])
					.setPopup(
						new mapboxgl.Popup({ offset: 20 }).setHTML(
							`
                  <div class="bg-default shadow-xl rounded-lg overflow-hidden">
                    
                  ${
										each?.cover
											? `<div class="bg-cover bg-center h-32 p-2" style="background-image: url(${each.cover})">
                       
                    </div>`
											: ""
									}

                    <div class="p-2">
                        <p class="text-xl text-default-inverted">${
													each.name
												}</p>
                        <p class="mt-2 text-default-inverted">${
													each.description
												}</p>
                    </div>
                   
                    <div class="px-2 py-2 border-t border-secondary-soft bg-secondary flex flex-col items-center justify-start">
                      <div class="text-md uppercase font-bold text-default-inverted tracking-wide">Neighbors</div>
                      <div class="flex mr-12">
                          <div class="bg-cover bg-center w-8 h-8 rounded-full ml-4" style="background-image: url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)" />
                          <div class="bg-cover bg-center w-8 h-8 rounded-full ml-4" style="background-image: url(https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)" />
                          <div class="bg-cover bg-center w-8 h-8 rounded-full ml-4" style="background-image: url(https://images.unsplash.com/photo-1572965733194-784e4b4efa45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)" />
                      </div>
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
