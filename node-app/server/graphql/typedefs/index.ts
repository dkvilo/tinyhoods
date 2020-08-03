import { gql } from "apollo-server-micro";

const typeDefs = gql`
	scalar Date

	type LineItems {
		price: String
		quantity: Int
	}

	type SessionPayload {
		id: String
		object: String
		billing_address_collection: String
		cancel_url: String
		client_reference_id: String
		customer: String
		customer_email: String
		livemode: Boolean
		locale: String
		mode: String
		payment_intent: String
		setup_intent: String
		shipping: String
		shipping_address_collection: String
		submit_type: String
		subscription: String
		success_url: String
		line_items: [LineItems]
		payment_method_types: [String]
	}

	type Recurring {
		aggregate_usage: String
		interval: String
		interval_count: Int
		usage_type: String
	}

	type PriceListPayloadData {
		id: String
		object: String
		active: Boolean
		billing_scheme: String
		created: Int
		currency: String
		livemode: Boolean
		lookup_key: String
		nickname: String
		product: String
		tiers_mode: String
		transform_quantity: String
		type: String
		unit_amount: Int
		unit_amount_decimal: String
		recurring: Recurring
	}

	type PriceListPayload {
		object: String
		url: String
		has_more: Boolean
		data: [PriceListPayloadData]
	}

	input TokenAuthenticationInput {
		token: String
	}

	input GeometryInput {
		type: String = "Point"
		coordinates: [Float!]!
	}

	type GeometryPayload {
		type: String!
		coordinates: [Float!]!
	}

	input LocationDataInput {
		token: String
		name: String!
		address: String!
		description: String!
		landform: String
		keywords: [String]!
		geometry: GeometryInput
		cover: String
		isPrivate: Boolean!
	}

	type KeyWordsPayload {
		id: ID!
		name: String!
	}

	input GetLocationInputData {
		coordinates: [Float!]
		maxDistance: Float = 2.1
		landform: String = ""
		keywords: [String]
		token: String
	}

	type LocationPayload {
		id: ID!
		name: String!
		address: String
		description: String
		geometry: GeometryPayload
		cover: String
		explorer: UserPayload
		landform: LandformPayload
		keywords: [KeyWordsPayload]!
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

	type UserMembershipPayload {
		isPaid: Boolean
		startedAt: Date
		expiresAt: Date
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
		questionsCount: Int!
		followersCount: Int!
		followingCount: Int!
		locationCount: Int!
		membership: UserMembershipPayload
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

	input ConfirmCheckoutSessionInput {
		user: ID!
		token: String!
		plan: String!
		sessionId: String!
	}

	input CreateCheckoutSessionInput {
		token: String!
		price: String!
		quantity: Int
	}

	type QuestionPayload {
		id: ID!
		content: String!
		author: UserPayload!
		location: LocationPayload!
		isPublished: Boolean!
		publishedAt: Date
	}

	type LandformPayload {
		id: ID!
		name: String!
		description: String!
	}

	type Query {
		getLocations(data: GetLocationInputData!): [LocationPayload]!
		getMyInfo(data: TokenAuthenticationInput!): UserPayload!
		getUser(username: String!): UserPayload!
		getUsers(data: TokenAuthenticationInput!): [UserPayload]!
		getQuestions(data: TokenAuthenticationInput!): [QuestionPayload]!
		getLandforms: [LandformPayload]!
		getKeywords: [KeyWordsPayload]!
	}

	type Mutation {
		createUser(data: UserCreateInput!): Boolean!
		authenticateUser(data: UserLoginInput!): AuthPayload!
		createLocation(data: LocationDataInput!): Boolean!
		updateAccountPrivacy(data: UserAccountPrivacyInput!): Boolean!
		createQuestion(data: QuestionInputData!): Boolean!
		confirmCheckoutSession(data: ConfirmCheckoutSessionInput!): Boolean!
		createCheckoutSession(data: CreateCheckoutSessionInput!): SessionPayload
	}
`;

export default typeDefs;
