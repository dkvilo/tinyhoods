import getLocations from "./Locations/getLocation";
import createLocation from "./Locations/createLocation";
import createUser from "./Users/register";
import authenticateUser from "./Users/authenticate";
import getMyInfo from "./Users/myInfo";
import getUser from "./Users/getUser";
import updateAccountPrivacy from "./Users/updateAccountPrivacy";
import getUsers from "./Users/getUsers";
import createQuestion from "./Questions/create";
import getQuestions from "./Questions/getQuestions";

const resolvers = {
	Query: {
		getLocations,
		getMyInfo,
		getUser,
		getUsers,
		getQuestions,
	},
	Mutation: {
		createLocation,
		createUser,
		authenticateUser,
		updateAccountPrivacy,
		createQuestion,
	},
};

export default resolvers;
