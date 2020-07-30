import LocationModel from "../../../models/locations";

export default async function (parent: any, args: any, context: any) {
	const response = await LocationModel.find()
		.populate({
			path: "explorer",
		})
		.sort({ createdAt: -1 });
	return response;
}
