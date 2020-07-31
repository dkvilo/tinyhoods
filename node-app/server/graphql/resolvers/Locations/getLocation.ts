import LocationModel from "../../../models/locations";
import { isEmpty } from "ramda";

export default async function (parent: any, args: any, context: any) {
	const { coordinates, maxDistance } = args.data;

	console.log({ coordinates, maxDistance });

	const response = await LocationModel.find({
		geometry: {
			$nearSphere: [42.004608, 41.9217],
			$maxDistance: maxDistance / (6371 * 1000),
		},
	})
		.populate({
			path: "explorer",
		})
		.sort({ createdAt: -1 });

	return response;
}
