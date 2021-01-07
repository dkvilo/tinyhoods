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

	input GetUsersTokenAuthenticationInput {
		token: String
		max: Int = 10
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
		name: String
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
		locations: [LocationPayload!]
		questions: [QuestionPayload!]
		isPrivate: Boolean
		questionsCount: Int!
		followersCount: Int!
		followingCount: Int!
		locationCount: Int!
		_following: Boolean!
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

	input GetQuestionsOnLocationInputType {
		location: ID!
		token: String!
	}

	input FollowUser {
		username: String!
		token: String!
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	input UserAvatarInput {
		token: String!
		avatar: String!
	}

	input Image {
		src: String
		index: Int
	}

	input CreatePostInput {
		token: String!
		content: String!
		images: [Image]!
		location: ID
		isPublished: Boolean
	}

	input CreateCommentInput {
		token: String!
		content: String!
		isPublished: Boolean
		documentId: ID!
		target: String! = "posts" # Target only can be posts or comments
	}

	type ImagePayloadType {
		src: String
		index: Int
	}

	type PostDocumentType {
		id: ID!
		author: UserPayload!
		images: [ImagePayloadType]!
		likes: [UserPayload]!
		likesCount: Int!
		comments: [CommentDocumentType]!
		recentComment: CommentDocumentType
		content: String
		isPublished: Boolean
		publishedAt: Date
		_liked: Boolean
		_editable: Boolean
	}

	type PostsPayload {
		docs: [PostDocumentType]!
		totalDocs: Int!
		limit: Int!
		page: Int!
		totalPages: Int!
		nextPage: Int
		prevPage: Int
		pagingCounter: Int!
		hasPrevPage: Boolean!
		hasNextPage: Boolean!
	}

	type CommentDocumentType {
		id: ID!
		author: UserPayload!
		content: String
		isPublished: Boolean
		publishedAt: Date
		replies: [CommentDocumentType]!
	}

	type CommentPayload {
		docs: [CommentDocumentType]!
		totalDocs: Int!
		limit: Int!
		page: Int!
		totalPages: Int!
		nextPage: Int
		prevPage: Int
		pagingCounter: Int!
		hasPrevPage: Boolean!
		hasNextPage: Boolean!
	}

	input GetPostsInput {
		page: Int = 1
		token: String!
		dataType: String = "private"
	}

	input ToggleLikePostInput {
		postId: String!
		token: String!
	}

	input CreateProjectInput {
		images: [Image]
		avatar: String!
		name: String!
		description: String!
		token: String!
	}

	type ProjectPayloadDocType {
		name: String
		description: String
		avatar: String
		images: [ImagePayloadType]
		address: String
		followers: [UserPayload]
		posts: [PostsPayload]
	}

	type ProjectPayload {
		docs: [ProjectPayloadDocType]!
		totalDocs: Int!
		limit: Int!
		page: Int!
		totalPages: Int!
		nextPage: Int
		prevPage: Int
		pagingCounter: Int!
		hasPrevPage: Boolean!
		hasNextPage: Boolean!
	}

	type Query {
		getLocations(data: GetLocationInputData!): [LocationPayload]!
		getMyInfo(data: TokenAuthenticationInput!): UserPayload!
		getUser(username: String!): UserPayload!
		getUsers(data: GetUsersTokenAuthenticationInput!): [UserPayload]!
		getQuestions(data: TokenAuthenticationInput!): [QuestionPayload]!
		getLandforms: [LandformPayload]!
		getKeywords: [KeyWordsPayload]!
		getQuestionsOnLocation(
			data: GetQuestionsOnLocationInputType!
		): [QuestionPayload]!
		getPosts(data: GetPostsInput!): PostsPayload!
		getPost(id: ID!): PostDocumentType!
		getComments(id: ID!, page: Int!): CommentPayload
		getUserProjects(id: ID!, page: Int!): ProjectPayload
	}

	type Mutation {
		followUser(data: FollowUser!): Boolean!
		unfollowUser(data: FollowUser!): Boolean!
		createUser(data: UserCreateInput!): Boolean!
		authenticateUser(data: UserLoginInput!): AuthPayload!
		createLocation(data: LocationDataInput!): Boolean!
		updateAccountPrivacy(data: UserAccountPrivacyInput!): Boolean!
		createQuestion(data: QuestionInputData!): Boolean!
		confirmCheckoutSession(data: ConfirmCheckoutSessionInput!): Boolean!
		createCheckoutSession(data: CreateCheckoutSessionInput!): SessionPayload
		updateAvatar(data: UserAvatarInput!): Boolean!
		createPost(data: CreatePostInput!): Boolean!
		createComment(data: CreateCommentInput!): Boolean!
		createProject(data: CreateProjectInput!): Boolean!
		createToggleLikePost(data: ToggleLikePostInput!): Boolean!
	}
`;

export default typeDefs;
