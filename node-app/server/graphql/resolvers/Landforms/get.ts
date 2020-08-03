import LandFormModel from "../../../models/landforms";

export default async function (parent: any, args: any, context: any) {
	return await LandFormModel.find({
		isDeleted: false,
	});
}
