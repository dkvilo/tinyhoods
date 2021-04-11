import React, { useContext, useState } from "react";
import Slider from "rc-slider";
import { FiltersContext } from "../context";

const SliderF: any = Slider;

function SliderInput(): JSX.Element {
	const { state, dispatch } = useContext<any>(FiltersContext);
	const [value, setValue] = useState(state.maxDistance);

	return (
		<div className="w-full">
			<div className="flex items-center justify-center text-default-inverted py-2 text-xs">
				<span className="mr-1 font-bold">{value}</span> Km
			</div>
			<SliderF
				railStyle={{
					background: "var(--color-secondary-soft)",
					height: 10,
				}}
				trackStyle={{
					background: "var(--color-primary)",
					height: 10,
				}}
				handleStyle={{
					background: "var(--color-primary)",
					borderColor: "var(--color-secondary-soft)",
					outline: "none",
					height: 25,
					width: 25,
					top: 2.5,
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
