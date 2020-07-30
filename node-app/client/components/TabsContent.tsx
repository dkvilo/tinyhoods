import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import Card from "./Card";
import UsersList from "./UsersList";
import QuestionsList from "./QuestionsList";

function TabsContent({ loading, data, error, onFocus }: any) {
	return (
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
							FAQ
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
											onFocus(coordinates);
										}
									}}
									{...each}
								/>
							</div>
						))}
				</TabPanel>
				<TabPanel>
					<UsersList />
				</TabPanel>
				<TabPanel>
					<QuestionsList />
				</TabPanel>
			</Tabs>

			<footer className="py-2 mb-16 px-1 border-t-4 border-primary text-primary flex justify-between">
				<a
					href="https://twitter.com/dkvilo"
					target="_blank"
					rel="noopener noreferrer"
				>
					By @dkvilo
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
	);
}

export default TabsContent;
