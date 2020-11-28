import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new mongoose.Schema({
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

	// LOCATION
	location: {
		type: (mongoose.Schema as any).ObjectId,
		ref: "locations",
	},

	// COMMENTS
	comments: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "comments",
		},
	],
	recentComment: {
		type: (mongoose.Schema as any).ObjectId,
		ref: "Comments",
	},
	commentsCount: {
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

export default mongoose.model("posts", schema);
