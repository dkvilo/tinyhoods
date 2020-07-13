import LocationModel from "../../../models/locations";

export default async function createLocation(
	parent: any,
	args: any,
	context: any
) {
	return !!(await LocationModel.create({
		...args.data,
	}));
}
