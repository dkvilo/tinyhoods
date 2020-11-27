import mongoose from "mongoose";
import dotenv from "dotenv";
import KeyWordModel from "../../server/models/keywords";

dotenv.config();

const seed = [
	{
		name: "Astrophotography",
	},
	{
		name: "Night Photography",
	},
	{
		name: "Good View",
	},
	{
		name: "Lake",
	},
	{
		name: "River",
	},
	{
		name: "Beach",
	},
	{
		name: "Tiny House friendly",
	},
	{
		name: "Tiny House Community",
	},
	{
		name: "Tent Friendly",
	},
	{
		name: "Camping Spot",
	},
	{
		name: "Wildlife",
	},
	{
		name: "Friendly Natives",
	},
	{
		name: "Fishing Spot",
	},
	{
		name: "Mineral Waters",
	},
	{
		name: "Biking",
	},
	{
		name: "Snowboarding",
	},
];

async function Keywords() {
	console.log("Running Keywords Seeder ... ");
	for (const keyword of seed) {
		const response: any = await KeyWordModel.create(keyword);
		if (response) {
			const { name, _id } = response;
			console.log(` - Keyword: "${name}" Was inserted successful [${_id}]`);
		}
	}
	process.exit();
}

(async () => {
	console.log("Connecting to Database ... ");
	try {
		await mongoose.connect(
			`${process.env.DATABASE_ATLAS_PATH}?retryWrites=true&w=majority`,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			}
		);
		Keywords();
	} catch (e) {
		throw new Error(e.message);
	}
})();
