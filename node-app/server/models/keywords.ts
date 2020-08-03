import mongoose from "mongoose";

delete mongoose.connection.models["keywords"];

export default mongoose.model("keywords", {
	name: {
		type: String,
		required: [true, "Keywords Name is Required"],
		sparse: true,
		index: true,
	},
	createdAt: {
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
