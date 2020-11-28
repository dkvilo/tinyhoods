import React, { useState } from "react";
import CheckoutButton from "../forms/payments/Checkout";
import Select from "react-select";

const prices = [
	{
		value: 0,
		label: "Weekend Pass",
	},
	{
		value: 1,
		label: "Week Pass",
	},
	{
		value: 2,
		label: "Season Pass Lite",
	},
	{
		value: 3,
		label: "Season Pass",
	},
	{
		value: 4,
		label: "Citizen Pass",
	},
];

function CheckoutContainer(): JSX.Element {
	const [plan, setPlan] = useState<Number>(0);

	return (
		<div className="rounded">
			<Select
				placeholder="Upgrade to Traveler Pass"
				onChange={(selectedItem: any) => {
					const { value } = selectedItem;
					setPlan(value);
				}}
				closeMenuOnSelect
				noOptionsMessage={() => "No Nearby Locations"}
				isMulti={false}
				options={prices}
			/>
			<div className="mt-2">
				<CheckoutButton plan={plan} />
			</div>
		</div>
	);
}

export default CheckoutContainer;
