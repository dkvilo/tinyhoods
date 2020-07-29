import mongoose from "mongoose";

delete mongoose.connection.models["posts"];

export default mongoose.model("posts", {
	title: {
		type: String,
		required: [true, "Post Title is Required"],
		sparse: true,
		index: true,
	},
	description: {
		type: String,
	},
	publisher: {
		type: (mongoose.Schema as any).ObjectId,
		ref: "users",
	},
	location: {
		type: (mongoose.Schema as any).ObjectId,
		ref: "locations",
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
	deletedAt: {
		type: Date,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
} as any);
