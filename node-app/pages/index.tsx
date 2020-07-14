import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { useQuery } from "@apollo/react-hooks";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { gql } from "apollo-boost";

import Card from "../client/components/Card";
import Modal from "../client/components/Modal";
import Grid from "../client/components/Grid";

import { useDropToggleState } from "../client/hooks";
import AddHood from "../client/forms/hoods/add";
import SearchInput from "../client/components/SearchInput";
import AddPost from "../client/forms/posts/add";

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

const MapCSS = dynamic(
	() => import("../client/components/Map").then((mod) => mod.default) as any,
	{
		ssr: false,
	}
) as any;

// const ThemeToggleCSS = dynamic(
// 	() => import("../components/ThemeToggle").then((mod) => mod.default) as any,
// 	{
// 		ssr: false,
// 	}
// );

export default function Home() {
	const { loading, data, error } = useQuery(GET_LOCATIONS, {
		fetchPolicy: "network-only",
	});

	const [activeCoordinates, setActiveCoordinates] = useState(
		() => !loading && !error && data.getLocations[0].coordinates
	);

	const addLocationModalController = useDropToggleState(false);
	const [_, updateAddLocationModalState] = addLocationModalController;

	const askQuestionModalController = useDropToggleState(false);
	const [__, updateAskQuestionModalState] = askQuestionModalController;

	return (
		<div className=" w-full h-screen overflow-x-scroll">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta charSet="utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<meta name="description" content="Description" />
				<meta name="keywords" content="Keywords" />
				<title>TinyHoods - Explore Tiny world</title>

				<link rel="manifest" href="/manifest.json" />
				<link href="/location.svg" rel="icon" type="image/svg" sizes="16x16" />
				<link href="/location.svg" rel="icon" type="image/svg" sizes="32x32" />
				<link rel="apple-touch-icon" href="/location.svg"></link>
				<meta name="theme-color" content="#317EFB" />
			</Head>

			{!loading && !error && (
				<MapCSS
					activeCoordinates={activeCoordinates}
					data={data.getLocations}
				/>
			)}

			<Modal
				title="Add Current Location"
				controller={addLocationModalController}
			>
				<AddHood />
			</Modal>

			<Modal title="Ask a Question" controller={askQuestionModalController}>
				<AddPost />
			</Modal>

			<div
				className="relative rounded-md top-0 px-4 mt-6"
				style={{
					zIndex: 8888,
				}}
			>
				<div className="">
					<div className="container mx-auto flex items-center justify-between">
						<div className="flex shadow-md w-full bg-default rounded-full items-center">
							<img
								src="https://pbs.twimg.com/profile_images/1229224725987110913/SYkeH0yK_200x200.jpg"
								className="w-8 h-8 ml-2 rounded-full border-2 border-default-inverted"
							/>
							<SearchInput placeholder="Search ..." />
						</div>
						{/* <ThemeToggleCSS /> */}
						<button
							onClick={updateAskQuestionModalState as any}
							className="outline-none w-12 h-10 ml-2 bg-default shadow-md rounded-full p-2"
							style={{
								outline: "none",
							}}
						>
							<svg fill="var(--color-primary)" viewBox="0 0 20 20">
								<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
								<path
									fillRule="evenodd"
									d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
						<button
							onClick={updateAddLocationModalState as any}
							className="outline-none w-12 h-10 ml-2 bg-default shadow-md rounded-full p-2"
							style={{
								outline: "none",
							}}
						>
							<svg
								version="1.1"
								id="Capa_1"
								x="0px"
								y="0px"
								viewBox="0 0 425.963 425.963"
							>
								<path
									d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
									className="active-path"
									fill="var(--color-primary)"
								/>
							</svg>
						</button>
					</div>
				</div>
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
						<div>
							<Tabs selectedTabClassName="bg-primary text-default">
								<div
									className="my-4 sticky"
									style={{
										top: 15,
									}}
								>
									<TabList className="cursor-pointer flex bg-default shadow-lg justify-start overflow-hidden items-center rounded-full">
										<Tab
											selectedClassName=""
											className="text-xl text-primary text-center mr-3 w-full py-1 px-2"
										>
											Hoods
										</Tab>
										<Tab className="text-xl text-primary text-center mr-3 w-full py-1 px-2">
											People
										</Tab>
										<Tab className="text-xl text-primary text-center w-full py-1 px-2">
											Favorites
										</Tab>
									</TabList>
								</div>

								<TabPanel>
									{!loading &&
										!error &&
										data.getLocations.map((each: any) => (
											<div key={each.address} className="mb-4">
												<Card
													onSelect={(coordinates: any) => {
														if (
															"standalone" in window.navigator &&
															(window.navigator as any).standalone
														) {
															window.open(
																`http://maps.apple.com/?saddr=${27.2038},${77.5011}&daddr=${
																	coordinates.latitude
																},${coordinates.longitude}&dirflg=d`,
																"_blank"
															);
														} else {
															setActiveCoordinates(coordinates);
														}
													}}
													{...each}
												/>
											</div>
										))}
								</TabPanel>
								<TabPanel>
									<h2>People's content 2</h2>
									<div className="h-screen bg-default rounded-md shadow-md" />
								</TabPanel>
								<TabPanel>
									<h2>Favorite's content 3</h2>
									<div className="h-screen bg-default rounded-md shadow-md" />
								</TabPanel>
							</Tabs>

							<footer className="py-2 mb-16 px-1 border-t-4 border-primary text-primary flex justify-between">
								<a
									href="https://twitter.com/dkvilo"
									target="_blank"
									rel="noopener noreferrer"
								>
									Developed by @dkvilo
								</a>

								<a
									href="https://twitter.com/dkvilo"
									target="_blank"
									rel="noopener noreferrer"
								>
									2020 &copy; TinyHoods.Net
								</a>
							</footer>
						</div>
					</Grid>
				</div>
			</main>
		</div>
	);
}
