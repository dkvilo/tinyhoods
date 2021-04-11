import mongoose from "mongoose";
import { ApolloServer, ApolloError } from "apollo-server-micro";
import { randomBytes } from "crypto";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";

import cfg from "../shared/config";

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
			if (process.env.NODE_ENV === "development") {
				console.log("error", `${JSON.stringify(err, null, 2)}`);
			} else {
				console.log("error", `${err.message}`);
			}
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
