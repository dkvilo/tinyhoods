import mongoose from "mongoose";

delete mongoose.connection.models["questions"];

export default mongoose.model("questions", {
	content: {
		type: String,
		required: [true, "Question Content is Required"],
		sparse: true,
		index: true,
	},
	author: {
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
