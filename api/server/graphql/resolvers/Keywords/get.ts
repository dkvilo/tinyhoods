import KeywordModel from "../../../models/keywords";

export default async function (parent: any, args: any, context: any) {
	return await KeywordModel.find({
		isDeleted: false,
	});
}
