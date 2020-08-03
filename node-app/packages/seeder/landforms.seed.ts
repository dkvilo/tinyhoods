import mongoose from "mongoose";
import dotenv from "dotenv";
import LandFormModel from "../../server/models/landforms";

dotenv.config();

const seed = [
	{
		name: "Plains",
		description:
			"Plains, which make up 55 percent of the earth’s surface, are characterized by relatively flat stretches of land that lie less than 500 feet above sea level. Plains are home to 90 percent of the world’s population and generally border a seacoast and gradually slope up to high-elevation landforms. An exception to this is the Interior Plains, which expands across the central region of North America.",
	},
	{
		name: "Plateaus",
		description:
			"Plateaus are characterized by high elevations, arid climates and are generally bordered on at least one side by bluffs. Most have an average elevation of 2,000 feet; the world’s largest plateau, the Tibetan Plateau in central Asia, has an average elevation of more than 16,000 feet.",
	},
	{
		name: "Mountains",
		description:
			"Mountains are the least habitable land formation and are characterized as having an elevation of more than 2,000 feet. Mountain ranges generally are located near the border of continents; however, many mountains are located within the ocean. Mt. Everest is the tallest mountain in the world at 29,028 feet, or 5 1/2 miles above sea level.",
	},
	{
		name: "Hills",
		description:
			"Hills are similar to mountains in that they generally have a distinct summit; however, hills are classified as having an elevation between 500 to 2,000 feet and have a climate that is cooler than plains but warmer than mountains. Poteau, Oklahoma’s Cavanal Hill, is generally regarded as the world’s highest hill — its tallest point reaches 1,999 feet.",
	},
	{
		name: "Valleys",
		description:
			"Valleys are lowlands between mountains and hills that serve as a natural gutter that brings water to nearby streams, lakes or oceans. Valleys are characterized into two groups: v-shaped valleys and u-shaped valleys. V-shaped valleys are formed by erosion and rivers, whereas u-shaped valleys were carved by glaciers as they passed through.",
	},
	{
		name: "Glaciers",
		description:
			"Glaciers are large, moving masses of ice that form near the north and south poles or in the mountains. Glaciers cover nearly 10 percent of the land on earth and store about 75 percent of the planet’s freshwater. Lambert Glacier, located in eastern Antarctica, is considered one of the world’s largest glaciers. It covers more than 380,000 square miles and is about 250 miles long.",
	},
	{
		name: "Loess",
		description:
			"Loess is a deposit of sediment that is formed during the climate warming in an area after a glacier passes through. While it is primarily made up of silt, the mineral most found in loess deposits is quartz. Characteristics of loess are fertile topsoil, and while it is found across the world, the largest and thickest loess covers northern China.",
	},
];

async function Landform() {
	console.log("Running Landforms Seeder ... ");
	for (const landform of seed) {
		const response: any = await LandFormModel.create(landform);
		if (response) {
			const { name, _id } = response;
			console.log(` - Landform: "${name}" Was inserted successful [${_id}]`);
		}
	}
	process.exit();
}

(async () => {
	console.log("Connecting to Database ... ");
	console.log(process.env.DATABASE_ATLAS_PATH);

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
		Landform();
	} catch (e) {
		throw new Error(e.message);
	}
})();
