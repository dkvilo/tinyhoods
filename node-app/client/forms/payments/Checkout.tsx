import React, { useReducer, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { isEmpty } from "ramda";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import Button from "../../components/Button";
import LoaderDots from "../../components/Loader";
import { UserTokenContext } from "../../context";

const stripePromise = loadStripe(
	"pk_test_51HBQ11ESEHCrAVLIeiC0cH2obfjzDMqHTAMEXMKBvzZ271pqWK72TUikE3T4oe6TcYzB0sbgt60OIKyFVm9RtKWH00HqoStrcF"
);

const formatPrice = ({ amount, currency, quantity }: any) => {
	const numberFormat = new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency,
		currencyDisplay: "symbol",
	});
	const parts = numberFormat.formatToParts(amount);
	let zeroDecimalCurrency = true;
	for (let part of parts) {
		if (part.type === "decimal") {
			zeroDecimalCurrency = false;
		}
	}
	amount = zeroDecimalCurrency ? amount : amount / 100;
	const total: any = (quantity * amount).toFixed(2);
	return numberFormat.format(total);
};

const prices = [
	{
		id: "price_1HBQooESEHCrAVLIBQazf6AS",
		value: 299,
		description:
			"With Weekend Pass you will be able to access unlimited filters and data from all over the world only for weekend",

		name: "Weekend Pass",
	},
	{
		id: "price_1HBQiIESEHCrAVLILl4CUtAk",
		value: 999,
		description:
			"With Week Pass you will be able to access unlimited filters and data from all over the world for 1 week time period.",
		name: "Week Pass",
	},
	{
		id: "price_1HBQhIESEHCrAVLIZJiX6H3b",
		value: 1998.9999999999998,
		description:
			"With Season Pass Lite you will be able to access unlimited filters and data from all over the world for 1 month time period.",
		name: "Season Pass Lite",
	},
	{
		id: "price_1HBQg4ESEHCrAVLI36hJWM7Q",
		value: 3999,
		description:
			"With Season Pass you will be able to access unlimited filters and data from all over the world for 3 month time period.",
		name: "Season Pass",
	},
	{
		id: "price_1HBRPPESEHCrAVLIXEpmLCke",
		value: 15999,
		description:
			"With Citizen Pass you will be able to access unlimited filters and data from all over the world for LIFETIME",
		name: "Citizen Pass",
	},
];

function reducer(defaultState: any, action: any) {
	switch (action.type) {
		case "setPrice":
			return {
				...defaultState,
				priceId: action.payload.priceId,
				basePrice: action.payload.basePrice,
				currency: action.payload.currency,
				price: action.payload.price,
				name: action.payload.name,
				description: action.payload.description,
				loading: false,
				error: null,
			};
		case "setLoading":
			return { ...defaultState, loading: action.payload.loading };
		case "setError":
			return { ...defaultState, error: action.payload.error };
		default:
			return defaultState;
	}
}

const CREATE_CHECKOUT_SESSION = gql`
	mutation createCheckoutSession($data: CreateCheckoutSessionInput!) {
		createCheckoutSession(data: $data) {
			id
			cancel_url
			success_url
			locale
		}
	}
`;

const CheckoutButton = ({ plan }: any) => {
	const { state: loginState } = useContext<any>(UserTokenContext);

	const [
		createCheckoutSession,
		{ loading, error: mutationError },
	] = useMutation(CREATE_CHECKOUT_SESSION);

	const [state, dispatch] = useReducer(reducer, {
		loading: !plan,
		error: null,
	});

	useEffect(() => {
		dispatch({
			type: "setPrice",
			payload: {
				priceId: prices[plan].id,
				basePrice: prices[plan].value,
				name: prices[plan].name,
				description: prices[plan].description,
				currency: "EUR",
				price: formatPrice({
					amount: prices[plan].value,
					currency: "EUR",
					quantity: 1,
				}),
				quantity: 1,
				loading: false,
				error: null,
			},
		});
	}, [plan]);

	const handleSubmit = async (event: any) => {
		dispatch({ type: "setLoading", payload: { loading: true } });
		try {
			const { data } = await createCheckoutSession({
				variables: {
					data: {
						token: loginState.token,
						price: state.priceId,
					},
				},
			});

			const stripe: any = await stripePromise;
			await stripe.redirectToCheckout({
				sessionId: data.createCheckoutSession.id,
			});
		} catch (e) {
			dispatch({ type: "setError", payload: { error: e } });
			dispatch({ type: "setLoading", payload: { loading: false } });
		}
	};

	return (
		<>
			{loading && !mutationError && <LoaderDots />}

			<div className="lex flex-col max-w-full bg-green-400 rounded-lg shadow-2xl overflow-hidden">
				<div className="flex items-center justify-start md:h-32 lg:h-32 xl:h-32">
					<div className="py-2 px-4 text-center w-full">
						<h2 className="text-default text-2xl font-bold">{state.name}</h2>
						<p className="mt-2 text-default text-sm">{state.description}</p>
					</div>
				</div>

				<div className="flex flex-col flex-1 justify-center w-full overflow-hidden">
					<Button
						role="link"
						onClick={handleSubmit}
						className="flex justify-center p-6 text-default px-4 bg-primary"
						disabled={state.loading}
					>
						{state.loading || !state.price
							? `Loading...`
							: `Proceed to Checkout for ${state.price}`}
					</Button>
				</div>
			</div>
		</>
	);
};

export default CheckoutButton;
