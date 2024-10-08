import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new mongoose.Schema({
	onModelSelector: {
		type: (mongoose.Schema as any).ObjectId,
		required: true,
		refPath: "onModel",
	},
	onModel: {
		type: String,
		required: true,
		enum: ["comments", "posts"],
	},

	content: {
		type: String,
	},

	images: [
		{
			src: {
				type: String,
			},
			index: {
				type: Number,
			},
		},
	],

	// REPLIES
	replies: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "comments",
		},
	],

	recentReplies: {
		type: (mongoose.Schema as any).ObjectId,
		ref: "Comments",
	},

	repliesCount: {
		type: Number,
		default: 0,
	},

	// LIKES
	likes: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "likes",
		},
	],

	likesCount: {
		type: Number,
		default: 0,
	},

	author: {
		type: (mongoose.Schema as any).ObjectId,
		ref: "users",
	},

	isPublished: {
		type: Boolean,
		default: false,
	},

	publishedAt: {
		type: Date,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},

	updatedAt: {
		type: Date,
		default: Date.now(),
	},

	isDeleted: {
		type: Boolean,
		default: false,
	},

	deletedAt: {
		type: Date,
	},
} as any);

schema.plugin(mongoosePaginate);

export default mongoose.model("comments", schema);
