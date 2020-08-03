import mongoose from "mongoose";

delete mongoose.connection.models["landforms"];

export default mongoose.model("landforms", {
	name: {
		type: String,
		required: [true, "Landform Name is Required"],
		sparse: true,
		index: true,
	},
	description: {
		type: String,
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
