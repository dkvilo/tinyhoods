import { router, get, post } from "microrouter";
import cors from "micro-cors";
import micro from "micro";

import { Server } from "./server/graphql";

const graphqlPath = "/api/graphql";
const handler = Server.createHandler({ path: graphqlPath });

const default_response = {
	host: "api.tinyhoods.net",
	service_name: "tinyhoods_sunset",
	version: "1.0.2-rc",
};

if (process.env.NODE_ENV === "development") {
	const server = micro(async (req, res) => {
		return await handler(req, res);
	});
	server.listen(4000, () => console.log("Listening on localhost:4000"));
}

export default cors()(
	router(
		get("/", (req, res) => default_response),
		post(graphqlPath, handler),
		get(graphqlPath, handler)
	)
);
