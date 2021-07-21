import { combineReducers } from "redux";
import location from "./location/location.js";
import intro from "./intro/intro.js";
import signupData from "./auth/signup.js";
import jobData from "./jobs/data.js";
import portfolio from "./portfolio/index.js";
import invitation from "./skype/index.js";
import wallPostSettings from "./wall/wall.js";
import forum from "./forum/index.js";
import payments from "./payments/index.js";
import savedFiles from "./work/index.js";

export default combineReducers({
	location,
    intro,
    signupData,
    jobData,
    portfolio,
    videoInvitationInfo: invitation,
    wallPosts: wallPostSettings,
    forum,
    payments,
    savedFiles
});