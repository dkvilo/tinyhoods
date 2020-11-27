import mongoose from "mongoose";

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
