import getLocations from "./Locations/getLocation";
import createLocation from "./Locations/createLocation";
import createUser from "./Users/register";
import authenticateUser from "./Users/authenticate";
import getMyInfo from "./Users/myInfo";
import getUser from "./Users/getUser";
import updateAccountPrivacy from "./Users/updateAccountPrivacy";

const resolvers = {
	Query: {
		getLocations,
		getMyInfo,
		getUser,
	},
	Mutation: {
		createLocation,
		createUser,
		authenticateUser,
		updateAccountPrivacy,
	},
};

export default resolvers;
