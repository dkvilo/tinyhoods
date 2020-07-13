import getLocations from "./Locations/getLocation";
import createLocation from "./Locations/createLocation";
import createUser from "./Users/register";
import authenticateUser from "./Users/authenticate";

const resolvers = {
	Query: {
		getLocations,
	},
	Mutation: {
		createLocation,
		createUser,
		authenticateUser,
	},
};

export default resolvers;
