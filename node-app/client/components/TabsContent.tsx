import React, { useContext } from "react";
import { isEmpty } from "ramda";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import Card from "./Card";
import UsersList from "./UsersList";
import QuestionsList from "./QuestionsList";
import Container from "./Container";
import EmptyCard from "./EmptyCard";
import Loader from "./Loader";

import { UserTokenContext } from "../context";

import AuthCard from "./AuthCard";

function TabsContent({ loading, data, error, onFocus }: any) {
	const { state: loginState } = useContext<any>(UserTokenContext);

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
							className="text-lg text-primary text-center mr-3 w-full py-1 px-2"
						>
							Hoods
						</Tab>
						<Tab className="text-lg text-primary text-center mr-3 w-full py-1 px-2">
							People
						</Tab>
						<Tab className="text-lg text-primary text-center w-full py-1 px-2">
							Questions
						</Tab>
					</TabList>
				</div>

				<TabPanel>
					<Container>
						<>
							{loading && !error && <Loader />}
							{!loading &&
								!error &&
								data.getLocations.map((each: any) => (
									<div key={each.address}>
										<Card
											onSelect={(coordinates: any) => {
												onFocus(coordinates);
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
						{loginState.isLogin ? (
							<UsersList />
						) : (
							<div className="p-2">
								<h1 className="mb-4 text-primary text-center">People</h1>

								<AuthCard />
							</div>
						)}
					</Container>
				</TabPanel>
				<TabPanel>
					<Container>
						{loginState.isLogin ? (
							<QuestionsList />
						) : (
							<div className="p-2">
								<h1 className="mb-4 text-primary text-center">Questions</h1>
								<AuthCard />
							</div>
						)}
					</Container>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default TabsContent;
