import mongoose from "mongoose";

export default mongoose.model("likes", {
	// POST or COMMENT
	asType: {
		type: String,
		required: true,
		enum: ["POST", "COMMENT"],
		default: "POST",
	},

	on: {
		type: (mongoose.Schema as any).ObjectId,
		required: true,
		refPath: "onModel",
	},

	onModel: {
		type: String,
		required: true,
		enum: ["comments", "posts"],
	},

	actors: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "users",
		},
	],

	total: {
		type: Number,
		default: 0,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},
} as any);
