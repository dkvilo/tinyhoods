import mongoose from "mongoose";
import { isEmpty } from "ramda";
import LocationModel from "../../../models/locations";
import UserModel from "../../../models/users";
import { decryptToken, requireToken } from "../../../utils";
import moment from "moment";

async function nonRegisteredUserPayload({
	landform,
	coordinates,
	maxDistance,
	keywords,
}: any) {
	return await LocationModel.find({
		...(landform && {
			landform: mongoose.Types.ObjectId(landform),
		}),
		...(keywords &&
			!isEmpty(keywords) && {
				keywords: {
					$in: [...keywords],
				},
			}),
		isPrivate: false,
		geometry: {
			$nearSphere: !isEmpty(coordinates)
				? [parseFloat(coordinates[0]), parseFloat(coordinates[1])]
				: [41.920752, 42.010041],
			$maxDistance: 10000 / (6371 * 1000),
		},
	})
		.populate({
			path: "explorer",
		})
		.populate({
			path: "landform",
		})
		.populate({
			path: "keywords",
		});
}

async function registeredUserPayload({
	landform,
	coordinates,
	maxDistance,
	keywords,
	token,
}: any) {
	requireToken(token);

	let dist = maxDistance;

	if (maxDistance > 10000) {
		const userId = (decryptToken(token) as any).id;
		const userResponse = await UserModel.findById(userId);

		if (
			moment({}).diff(
				moment((userResponse as any).membership.expiresAt).format()
			) >= 0
		) {
			dist = 10000;
		}
	}

	return await LocationModel.find({
		...(landform && {
			landform: mongoose.Types.ObjectId(landform),
		}),
		...(keywords &&
			!isEmpty(keywords) && {
				keywords: {
					$in: [...keywords],
				},
			}),
		isPrivate: false,
		geometry: {
			$nearSphere: !isEmpty(coordinates)
				? [parseFloat(coordinates[0]), parseFloat(coordinates[1])]
				: [41.920752, 42.010041],
			$maxDistance: dist / (6371 * 1000),
		},
	})
		.populate({
			path: "explorer",
		})
		.populate({
			path: "landform",
		})
		.populate({
			path: "keywords",
		});
}

export default async function (parent: any, args: any, context: any) {
	const { coordinates, maxDistance, landform, keywords, token } = args.data;
	try {
		if (!token || isEmpty(token)) {
			return await nonRegisteredUserPayload({
				landform,
				coordinates,
				maxDistance,
				keywords,
			});
		} else {
			return await registeredUserPayload({
				coordinates,
				maxDistance,
				landform,
				keywords,
				token,
			});
		}
	} catch (e) {
		throw new Error(e.message);
	}
}
