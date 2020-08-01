import LocationModel from "../../../models/locations";
import { isEmpty } from "ramda";

export default async function (parent: any, args: any, context: any) {
	const { coordinates, maxDistance } = args.data;

	const response = await LocationModel.find({
		isPrivate: false,
		geometry: {
			$nearSphere: !isEmpty(coordinates)
				? [parseFloat(coordinates[0]), parseFloat(coordinates[1])]
				: [41.920752, 42.010041],
			$maxDistance: maxDistance / (6371 * 1000),
		},
	}).populate({
		path: "explorer",
	});

	return response;
}
