import { gql } from "apollo-server-micro";

const typeDefs = gql`
	scalar Date

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
		token: String
		name: String!
		address: String!
		description: String!
		coordinates: CoordsInput
		cover: String
	}

	type LocationPayload {
		id: ID!
		name: String!
		address: String
		description: String
		coordinates: CoordsPayload
		cover: String
		explorer: UserPayload
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

	input QuestionInputData {
		token: String!
		content: String!
		location: String!
		isPublished: Boolean!
	}

	type QuestionPayload {
		id: ID!
		content: String!
		author: UserPayload!
		location: LocationPayload!
		isPublished: Boolean!
		publishedAt: Date
	}

	type Query {
		getLocations: [LocationPayload]!
		getMyInfo(data: TokenAuthenticationInput!): UserPayload!
		getUser(username: String!): UserPayload!
		getUsers(data: TokenAuthenticationInput!): [UserPayload]!
		getQuestions: [QuestionPayload]!
	}

	type Mutation {
		createUser(data: UserCreateInput!): Boolean!
		authenticateUser(data: UserLoginInput!): AuthPayload!
		createLocation(data: LocationDataInput!): Boolean!
		updateAccountPrivacy(data: UserAccountPrivacyInput!): Boolean!
		createQuestion(data: QuestionInputData!): Boolean!
	}
`;

export default typeDefs;
