import SEOHeader from "../client/components/SEOHeader";
import LSidebar from "../client/components/static/LSidebar";
import RSidebar from "../client/components/static/RSidebar";
import Layout from "../client/screens/layout";

export default function Privacy(): JSX.Element {
	return (
		<>
			<SEOHeader title="TinyHoods" description=" - Privacy Policy" />
			<Layout
				left={<LSidebar />}
				right={<RSidebar />}
				center={
					<div className="p-2 bg-default shadow-md text-default-inverted">
						<h1 className="font-bold text-2xl my-3">
							Tiny Hoods Privacy Policy{" "}
						</h1>
						<p>
							This Privacy Policy describes how your personal information is
							collected, used, and shared when you visit or make a purchase from
							https://tinyhoods.net (the “Site”).
						</p>
						<p className="font-bold my-3">PERSONAL INFORMATION WE COLLECT</p>
						<p>
							When you visit the Site, we automatically collect certain
							information about your device, including information about your
							web browser, IP address, time zone, and some of the cookies that
							are installed on your device. Additionally, as you browse the
							Site, we collect information about the individual web pages or
							products that you view, what websites or search terms referred you
							to the Site, and information about how you interact with the Site.
							We refer to this automatically-collected information as “Device
							Information.”
						</p>
						<p>
							We collect Device Information using the following technologies: -
						</p>
						<ul className="my-3">
							<li className="mb-2 p-2 bg-secondary rounded-md">
								<span className="px-2 rounded-full text-default bg-green-500">
									Cookies
								</span>{" "}
								are data files that are placed on your device or computer and
								often include an anonymous unique identifier. For more
								information about cookies, and how to disable cookies, visit the
								<a
									href="http://www.allaboutcookies.org"
									className="ml-1 text-red-500"
									target="_blank"
									rel="noopener"
								>
									Link
								</a>
							</li>
							<li className="mb-2 p-2 bg-secondary rounded-md">
								<span className="px-2 rounded-full text-default bg-green-500">
									Log files
								</span>{" "}
								track actions occurring on the Site, and collect data including
								your IP address, browser type, Internet service provider,
								referring/exit pages, and date/time stamps.
							</li>
							<li className="mb-2 p-2 bg-secondary rounded-md">
								<span className="px-2 rounded-full text-default bg-green-500">
									Web beacons
								</span>{" "}
								<span className="px-2 rounded-full text-default bg-green-500">
									Tags
								</span>
								, and{" "}
								<span className="px-2 rounded-full text-default bg-green-500">
									Pixels
								</span>{" "}
								are electronic files used to record information about how you
								browse the Site.
							</li>
						</ul>
						<p className="font-bold">
							Additionally when you are registering on the Site, we collect
							certain information from you, including:
						</p>
						<ul className="p-2 my-3">
							<li>
								<p>First Name, Last Name</p>
							</li>
							<li>
								<p>Email Address</p>
							</li>
							<li>
								<p>Profile Picture (Optional)</p>
							</li>
						</ul>

						<p className="font-bold my-3">YOUR RIGHTS</p>
						<p>
							If you are a European resident, you have the right to access
							personal information we hold about you and to ask that your
							personal information be corrected, updated, or deleted. If you
							would like to exercise this right, please contact us through the
							contact information below.
						</p>

						<p className="my-3">
							Additionally, if you are a European resident we note that we are
							processing your information in order to fulfill contracts we might
							have with you (for example if you make an order through the Site),
							or otherwise to pursue our legitimate business interests listed
							above. Additionally, please note that your information will be
							transferred outside of Europe, including to Canada and the United
							States.
						</p>

						<p className="font-bold">DATA RETENTION</p>
						<p className="my-3">
							When you purchase an membership of the Site, we will not store
							your credit card Information. All Payment Processing is handled by{" "}
							<a
								href="http://www.stripe.com"
								className="ml-1 text-red-500"
								target="_blank"
								rel="noopener"
							>
								Stripe
							</a>
						</p>

						<p className="font-bold">MINORS</p>
						<p className="my-3">
							The Site is not intended for individuals under the age of{" "}
							<span className="px-1 font-bold rounded-full text-default bg-green-500">
								16
							</span>
						</p>

						<p className="font-bold">CHANGES</p>

						<p className="my-3">
							We may update this privacy policy from time to time in order to
							reflect, for example, changes to our practices or for other
							operational, legal or regulatory reasons.
						</p>

						<p className="font-bold">CONTACT US</p>
						<p className="my-3">
							For more information about our privacy practices, if you have
							questions, or if you would like to make a complaint, please
							contact us by e-mail at{" "}
							<span className="px-2 rounded-full text-default bg-green-500">
								david@katakuraa.dev
							</span>{" "}
							or by mail using the details provided below:
						</p>
						<p className="font-bold">
							Tbilisi, Georgia, Tbilisi, TB, 0178, Georgia
						</p>
					</div>
				}
			/>
		</>
	);
}
