import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "project name is required"],
		sparse: true,
		index: true,
	},
	avatar: {
		type: String,
	},
	followers: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "users",
		},
	],
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
	author: {
		type: (mongoose.Schema as any).ObjectId,
		ref: "users",
	},
	posts: [
		{
			type: (mongoose.Schema as any).ObjectId,
			ref: "posts",
		},
	],
	description: {
		type: String,
	},
	address: {
		type: String,
	},
	isCompleted: {
		type: Boolean,
		default: true,
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
	isPrivate: {
		type: Boolean,
		default: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
});

schema.plugin(mongoosePaginate);

export default mongoose.model("projects", schema);
