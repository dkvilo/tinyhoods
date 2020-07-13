import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default function (): JSX.Element {
	return (
		<>
			<Tabs>
				<TabList>
					<Tab>Title 1</Tab>
					<Tab>Title 2</Tab>
				</TabList>

				<TabPanel>
					<h2>Any content 1</h2>
				</TabPanel>
				<TabPanel>
					<h2>Any content 2</h2>
				</TabPanel>
			</Tabs>
			<div className="flex bg-default shadow-lg justify-start overflow-hidden items-center rounded-full">
				<h1 className="text-xl bg-primary text-default text-center mr-3 w-full py-1 px-2">
					<a className="rounded hover:bg-secondary" href="/">
						Hoods
					</a>
				</h1>
				<h1 className="text-xl text-primary text-center mr-3 w-full py-1 px-2">
					<a className="rounded hover:bg-secondary" href="/">
						People
					</a>
				</h1>
				<h1 className="text-xl text-primary text-center mr-3 w-full py-1 px-2">
					<a className="rounded hover:bg-secondary" href="/">
						Favorites
					</a>
				</h1>
			</div>
		</>
	);
}
