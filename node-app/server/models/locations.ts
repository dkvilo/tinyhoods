import mongoose from "mongoose";

delete mongoose.connection.models["locations"];

export default mongoose.model("locations", {
	name: {
		type: String,
		required: [true, "Location Name is Required"],
		sparse: true,
		index: true,
	},
	cover: {
		type: String,
	},
	description: {
		type: String,
	},
	address: {
		type: String,
	},
	coordinates: {
		longitude: {
			type: Number,
		},
		latitude: {
			type: Number,
		},
		accuracy: {
			type: Number,
		},
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
