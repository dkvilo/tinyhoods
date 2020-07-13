import { gql } from "apollo-server-micro";

const typeDefs = gql`
	input CoordsInput {
		longitude: Float!
		latitude: Float!
		accuracy: Float!
	}

	type CoordsPayload {
		longitude: Float!
		latitude: Float!
	}

	input LocationDataInput {
		name: String!
		address: String!
		description: String!
		coordinates: CoordsInput
		cover: String
	}

	type LocationPayload {
		name: String!
		address: String
		description: String
		coordinates: CoordsPayload
		cover: String
	}

	input UserCreateInput {
		email: String!
		password: String!
		name: String!
		username: String!
	}

	input UserLoginInput {
		email: String!
		password: String!
	}

	type UserPayload {
		image: String
		email: String
		name: String
		username: String
		about: String
		link: String
		following: [UserPayload!]
		followers: [UserPayload!]
		isPrivate: Boolean
	}

	type AuthPayload {
		token: String!
	}

	type Query {
		getLocations: [LocationPayload]
	}

	type Mutation {
		createUser(data: UserCreateInput!): Boolean!
		authenticateUser(data: UserLoginInput!): AuthPayload!
		createLocation(data: LocationDataInput!): Boolean!
	}
`;

export default typeDefs;
