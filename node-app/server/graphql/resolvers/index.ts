import getLocations from "./Locations/getLocation";
import createLocation from "./Locations/createLocation";
import createUser from "./Users/register";
import authenticateUser from "./Users/authenticate";
import getMyInfo from "./Users/myInfo";

const resolvers = {
	Query: {
		getLocations,
		getMyInfo,
	},
	Mutation: {
		createLocation,
		createUser,
		authenticateUser,
	},
};

export default resolvers;
