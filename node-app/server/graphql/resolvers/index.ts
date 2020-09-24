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
import confirmCheckoutSession from "./Payment/Checkout/confirm";
import createCheckoutSession from "./Payment/Checkout/create";
import getLandforms from "./Landforms/get";
import getKeywords from "./Keywords/get";
import getQuestionsOnLocation from "./Locations/getQuestionsOnLocation";
import followUser from "./Users/follow";
import unfollowUser from "./Users/unfollow";

const resolvers = {
	Query: {
		getLocations,
		getMyInfo,
		getUser,
		getUsers,
		getQuestions,
		getLandforms,
		getKeywords,
		getQuestionsOnLocation,
	},
	Mutation: {
		createLocation,
		createUser,
		authenticateUser,
		updateAccountPrivacy,
		createQuestion,
		confirmCheckoutSession,
		createCheckoutSession,
		followUser,
		unfollowUser,
	},
};

export default resolvers;
