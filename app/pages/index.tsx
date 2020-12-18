import React from "react";
import { Router, ShallowQuery } from "../client/components/ShallowRouter";
import SEOHeader from "../client/components/SEOHeader";
import AddPost from "../client/forms/post/add";
import AddHood from "../client/forms/hoods/add";
import Feed from "../client/screens/feed";
import Layout from "../client/screens/layout";
import RSidebar from "../client/components/static/RSidebar";
import LSidebar from "../client/components/static/LSidebar";
import MobileMenu from "../client/components/MobileMenu";
import AddProject from "../client/forms/project/add";

export default function () {
	return (
		<>
			<SEOHeader title="TinyHoods" description=" - Explore tiny world" />
			<Layout
				left={<LSidebar />}
				right={<RSidebar />}
				center={
					<>
						<ShallowQuery selector="tab" default={<Feed />}>
							<Router on="feed" component={<Feed />} />
							<Router on="add-hood" component={<AddHood />} />
							<Router on="new-project" component={<AddProject />} />
							<Router
								on="add-post"
								component={<AddPost onSuccess={() => {}} />}
							/>
						</ShallowQuery>
					</>
				}
				mobile={<MobileMenu />}
			/>
		</>
	);
}
