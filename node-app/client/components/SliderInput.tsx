import React, { useContext, useState } from "react";
import Slider from "rc-slider";
import { FiltersContext } from "../context";

function SliderInput(): JSX.Element {
	const { state, dispatch } = useContext<any>(FiltersContext);
	const [value, setValue] = useState(state.maxDistance);

	return (
		<div className="w-full p-2">
			<div className="flex items-center justify-between text-default-inverted py-2 text-sm">
				Visibility Distance (km) <span>{value}</span>
			</div>
			<Slider
				className="p-2 z-0"
				railStyle={{
					background: "var(--color-default)",
					height: 10,
				}}
				trackStyle={{
					background: "var(--color-primary)",
					height: 10,
				}}
				handleStyle={{
					background: "var(--color-primary)",
					borderColor: "var(--color-secondary)",
					outline: "none",
					height: 25,
					width: 25,
					top: 5.2,
				}}
				onAfterChange={(val: any) => {
					dispatch({
						type: "SET_DISTANCE",
						payload: {
							maxDistance: val,
						},
					});
				}}
				step={5}
				min={10}
				max={400}
				defaultValue={value}
				onChange={(val: any) => {
					setValue(val);
				}}
			/>
		</div>
	);
}

export default SliderInput;
