import { gql } from "apollo-server-micro";

const typeDefs = gql`
	input TokenAuthenticationInput {
		token: String
	}

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
		avatar: String
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

	input UserAccountPrivacyInput {
		isPrivate: Boolean!
		token: String!
	}

	input UserUpdateInput {
		about: String
		name: String
		link: String
	}

	type Query {
		getLocations: [LocationPayload]
		getMyInfo(data: TokenAuthenticationInput!): UserPayload!
		getUser(username: String!): UserPayload!
	}

	type Mutation {
		createUser(data: UserCreateInput!): Boolean!
		authenticateUser(data: UserLoginInput!): AuthPayload!
		createLocation(data: LocationDataInput!): Boolean!
		updateAccountPrivacy(data: UserAccountPrivacyInput!): Boolean!
	}
`;

export default typeDefs;
