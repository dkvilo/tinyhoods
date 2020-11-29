import mongoose from "mongoose";

export default mongoose.model("users", {
	image: {
		type: String,
	},

	name: {
		type: String,
		required: true,
	},

	about: {
		type: String,
	},

	link: {
		type: String,
	},

	username: {
		required: true,
		type: String,
		unique: true,
		trim: true,
		sparse: true,
		index: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	following: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "users",
		},
	],

	posts: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "pots",
		},
	],

	questions: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "questions",
		},
	],

	comments: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "comments",
		},
	],

	followers: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "users",
		},
	],

	locations: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "locations",
		},
	],

	isDeleted: {
		type: Boolean,
		default: false,
	},

	isPrivate: {
		type: Boolean,
		default: false,
	},

	membership: {
		startedAt: {
			type: Date,
		},
		expiresAt: {
			type: Date,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
	},

	isAdmin: {
		type: Boolean,
		default: false,
	},

	passwordResetHash: {
		type: String,
	},

	created_at: {
		type: Date,
		default: Date.now(),
	},
} as any);
