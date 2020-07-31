import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import Card from "./Card";
import UsersList from "./UsersList";
import QuestionsList from "./QuestionsList";
import Container from "./Container";
import { isEmpty } from "ramda";
import EmptyCard from "./EmptyCard";

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
					<Container>
						<>
							{!loading &&
								!error &&
								data.getLocations.map((each: any) => (
									<div key={each.address}>
										<Card
											onSelect={(coordinates: Number[]) => {
												if (
													"standalone" in window.navigator &&
													(window.navigator as any).standalone
												) {
													window.open(
														`http://maps.apple.com/?saddr=${27.2038},${77.5011}&daddr=${
															coordinates[1]
														},${coordinates[0]}&dirflg=d`,
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
							{isEmpty(data?.getLocations) && !loading && !error && (
								<EmptyCard />
							)}
						</>
					</Container>
				</TabPanel>
				<TabPanel>
					<Container>
						<UsersList />
					</Container>
				</TabPanel>
				<TabPanel>
					<Container>
						<QuestionsList />
					</Container>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default TabsContent;
