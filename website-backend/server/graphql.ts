import mongoose from "mongoose";
import { ApolloServer, ApolloError } from "apollo-server-micro";
import { randomBytes } from "crypto";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";

import cfg from "../shared/config";
import logger from "../bond/loggerboi";

mongoose.connect(
	`${(cfg as any).mongo.atlasPath}?retryWrites=true&w=majority`,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	}
);

export const Server = new ApolloServer({
	typeDefs,
	resolvers,
	formatError: (err: any) => {
		if (err) {
			err._id = randomBytes(32).toString("hex");
			logger.Error(JSON.stringify(err));
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
