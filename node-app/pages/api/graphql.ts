import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-micro";

import resolvers from "../../server/graphql/resolvers";
import typeDefs from "../../server/graphql/typedefs";

import cfg from "../../shared/config";

mongoose.set("useCreateIndex", true);
mongoose.connect(
	`${(cfg as any).mongo.atlasPath}?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	}
);

const Server = new ApolloServer({
	typeDefs,
	resolvers,
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default Server.createHandler({ path: "/api/graphql" });
