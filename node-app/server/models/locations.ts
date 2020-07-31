import mongoose from "mongoose";

delete mongoose.connection.models["locations"];

const GeoSchema = new mongoose.Schema({
	type: {
		type: String,
		default: "Point",
	},
	coordinates: {
		type: [Number],
		index: "2dsphere",
	},
});

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
	explorer: {
		type: (mongoose.Schema as any).ObjectId,
		ref: "users",
	},
	citizens: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "users",
		},
	],
	posts: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "posts",
		},
	],
	questions: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "questions",
		},
	],
	description: {
		type: String,
	},
	address: {
		type: String,
	},
	geometry: GeoSchema,
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
