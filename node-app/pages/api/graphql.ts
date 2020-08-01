import mongoose from "mongoose";
import { ApolloServer, ApolloError } from "apollo-server-micro";

import resolvers from "../../server/graphql/resolvers";
import typeDefs from "../../server/graphql/typedefs";

import cfg from "../../shared/config";
import { randomBytes } from "crypto";

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
	formatError: (err: any) => {
		if (err) {
			err._id = randomBytes(32).toString("hex");
			console.log("error", `${JSON.stringify(err, null, 2)}`);
		}

		if (err.message.startsWith("Database Error: ")) {
			return new Error("Internal server error");
		}

		if (err.originalError instanceof ApolloError) {
			return err.message;
		}

		return err.message;
	},

	playground: process.env.NODE_ENV === "development",
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default Server.createHandler({ path: "/api/graphql" });
