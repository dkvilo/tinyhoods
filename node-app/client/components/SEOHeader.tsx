import React from "react";
import Head from "next/head";

interface IProps {
	title: string;
	description: string;
}

function SEOHeader({ title, description }: IProps): JSX.Element {
	return (
		<Head>
			<link rel="icon" href="/favicon.ico" />
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta
				name="viewport"
				content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
			/>
			<meta name="description" content="Description" />
			<meta name="keywords" content="Keywords" />
			<title>
				{title}
				{description}
			</title>

			<link rel="manifest" href="/manifest.json" />
			<link href="/location.svg" rel="icon" type="image/svg" sizes="16x16" />
			<link href="/location.svg" rel="icon" type="image/svg" sizes="32x32" />
			<link rel="apple-touch-icon" href="/location.svg"></link>
			<meta name="theme-color" content="#317EFB" />
		</Head>
	);
}

export default SEOHeader;
