import React from "react";
import Link from "next/link";

import SEOHeader from "../../../client/components/SEOHeader";
import Grid from "../../../client/components/Grid";

export default function Cancel() {
	return (
		<div className=" w-full h-screen overflow-x-scroll">
			<SEOHeader title="TinyHoods" description=" - Checkout Cancel" />

			<Grid>
				<div className="flex my-10 flex-col items-center justify-center w-full">
					<div className="flex flex-col items-center justify-center p-4 w-full rounded text-primary text-2xl">
						<div>Payment was canceled</div>
					</div>
					<Link href="/">
						<span className="flex items-center justify-center mt-2 bg-default w-full text-primary p-2 rounded-md">
							Go to Home Page
						</span>
					</Link>
				</div>
			</Grid>
		</div>
	);
}
