import { Server } from "./server/graphql";
import { router, get, post } from "microrouter";

const graphqlPath = "/api/graphql";
const handler = Server.createHandler({ path: graphqlPath });

const default_response = {
	host: "api.tinyhoods.net",
	service_name: "tinyhoods_sunset",
	version: "1.0.2-rc",
};

export default router(
	get("/", (req, res) => default_response),
	post(graphqlPath, handler),
	get(graphqlPath, handler)
);
