const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const router = express.Router();
const config = require("config");
// init middleware
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoDB = require("./config/db.js");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	}
});
const xss = require('xss-clean');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");
const os = require("os");
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


aws.config.update({
    secretAccessKey: config.get("wasabiSecretAccessKey"),
    accessKeyId: config.get("wasabiAccessKey"),
    region: config.get("wasabiRegion")
});

const PORT = process.env.PORT || 5000;

mongoDB();

app.options('*', cors());
app.use('*', cors());
app.use(cors());

const maybe = (fn) => {
    return (req, res, next) => {
        if (req.path === '/webhook' || req.path === '/upload/profile/pic/video') {
            next();
        } else {
            fn(req, res, next);
        }
    }
}
const limitSize = (fn) => {
    return (req, res, next) => {
        if (req.path === '/upload/profile/pic/video') {
			fn(req, res, next);
        } else {
            next();
        }
    }
}
app.use(maybe(bodyParser.json({
	limit: "500mb"
})));
app.use(maybe(bodyParser.urlencoded({
	limit: "500mb",
	extended: false
})));
app.use(limitSize(bodyParser.json({
	limit: "20mb"
})));
app.use(limitSize(bodyParser.urlencoded({
	limit: "20mb",
	extended: false
})));


const limiter = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000 * 1000, // remove the last 1000 for production
    message: 'Too many requests' // message to send
}); 

app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
app.use(limiter);


app.use("/login", require("./routes/auth/login/login.js"));
app.use("/check/code/email", require("./routes/auth/emailConfirmation/confirmation.js"));
app.use("/send/email/code/verifcation", require("./routes/auth/send/sendEmail.js"));
app.use("/register", require("./routes/auth/register/register.js"));
app.use("/send/phone/confirmation", require("./routes/auth/phone/sendCode.js"));
app.use("/attempt/phone/verifcation", require("./routes/auth/phone/verify.js"));
app.use("/check/username/taken", require("./routes/auth/username/checkUsername.js"));
app.use("/check/email/taken", require("./routes/auth/emailConfirmation/checkTaken.js"));
app.use("/update/google/account/information", require("./routes/auth/google/addAdditionalInfo.js"));
app.use("/check/google/user/existant", require("./routes/auth/google/checkUserExists.js"));
app.use("/upload/cover/photo", require("./routes/profile/pictures/uploadCoverPhoto.js"));
app.use("/gather/user", require("./routes/gatherUser.js"));
app.use("/upload/profile/video", require("./routes/profile/videos/uploadProfileVideo.js"));
app.use("/upload/profile/pic/video", require("./routes/profile/videos/uploadExistingVideo.js"));
app.use("/check/skills/token", require("./routes/auth/tokens/getStripeToken.js"));
app.use("/generate/tags/ai", require("./routes/ai/tags/generateTags.js"));
app.use("/post/new/job", require("./routes/jobs/postNewJob/postNewJob.js"));
app.use("/gather/jobs", require("./routes/jobs/gatherJobs/gatherAllJobs.js"));
app.use("/gather/cover/photos", require("./routes/profile/coverPhotoRelated/gatherPhotos/gather.js"));
app.use("/gather/all/users", require("./routes/people/listUsers/gatherAllUsers.js"));
app.use("/start/conversation/save", require("./routes/messaging/startConversation/startConvo.js"));
app.use("/save/firebase/token", require("./routes/firebase/token/saveToken.js"));
app.use("/gather/profile/pictures", require("./routes/messaging/activeConversations/gatherProfilePictures.js"));
app.use("/upload/new/profile/picture/gallery/images", require("./routes/profile/pictures/uploadProfilePictureGallery.js"));
app.use("/gather/profile/pictures/all", require("./routes/profile/pictures/gatherAllProfilePictures/gatherAll.js"));
app.use("/gather/credit/debit/cards", require("./routes/account/payments/payments/gather/gatherCards.js"));
app.use("/delete/paypal/account/email", require("./routes/account/payments/payments/changes/deletePaypalEmailAddress.js"));
app.use("/add/card/payments", require("./routes/account/payments/payments/create/createPayment.js"));
app.use("/create/new/payout/bank/account/information", require("./routes/account/payments/payouts/create/craeteNewBankAccountAdd.js"));
app.use("/cashout/payout/instant", require("./routes/account/payments/payouts/cashout/cashout.js"));
app.use("/edit/card/individual", require("./routes/account/payments/payments/changes/deleteCard.js"));
app.use("/update/payment/primary", require("./routes/account/payments/payments/changes/makeCardPrimary.js"));
app.use("/upload/tags", require("./routes/profile/tags/uploadTags.js"));
app.use("/upload/video/introduction", require("./routes/profile/introduction/uploadIntroduction.js"));
app.use("/upload/employment/history", require("./routes/profile/employmentHistory/employmentAdd.js"));
app.use("/delete/employment/job", require("./routes/profile/employmentHistory/deleteJob.js"));
app.use("/generate/tags", require("./routes/tags/generateTags.js"));
app.use("/gather/users/location/only", require("./routes/jobs/individual/gatherProfilePicAndSideData.js"));
app.use("/update/location/geo", require("./routes/location/updateUserLocation.js"));
app.use("/search/software/deliverables", require("./routes/portfolio/searching/searchSoftwareDeliverables.js"));
app.use("/upload/task/file", require("./routes/portfolio/files/uploadTaskFile.js"));
app.use("/upload/solution/file", require("./routes/portfolio/files/uploadSolutionFiles.js"));
app.use("/upload/portfolio/project", require("./routes/portfolio/postPortfolioProjectLive/index.js"));
app.use("/delete/portfolio/item", require("./routes/portfolio/delete/deletePortfolioItem.js"));
app.use("/puchased/tokens/iap", require("./routes/tokens/addTokensToAccount.js"));
app.use("/gather/job", require("./routes/jobs/gatherJobs/gatherIndividualJob.js"));
app.use("/send/friend/request", require("./routes/friends/sendFriendRequest/sendRequest.js"));
app.use("/post/wall/post", require("./routes/wall/newWallPost/newWallPost.js"));
app.use("/gather/all/wall/posts", require("./routes/wall/gatherPosts/gatherAllWallPosts.js"));
app.use("/gather/breif/information/about/user", require("./routes/wall/gatherPosts/gatherUserInformationBrief.js"));
app.use("/gather/notifications", require("./routes/notifications/gather.js"));
app.use("/gather/user/pending/requests", require("./routes/friends/pending/getPendingRequestInfo.js"));
app.use("/add/friend", require("./routes/friends/newFriends/addFriend.js"));
app.use("/delete/friend/request", require("./routes/friends/newFriends/rejectRequest.js"));
app.use("/gather/already/accepted/friends", require("./routes/friends/acceptedFriends/gatherAcceptedFriends.js"));
app.use("/upload/content/attachment", require("./routes/jobs/individual/uploadContent.js"));
app.use("/apply/to/listing/job", require("./routes/jobs/individual/applyToJob.js"));
app.use("/apply/to/listing/hourly", require("./routes/jobs/individual/applyToJobHourly.js"));
app.use("/gather/previously/applied/proposals", require("./routes/proposals/alreadySubmittedProposals.js"));
app.use("/gather/individual/job/listing", require("./routes/proposals/gatherIndividualJob.js"));
app.use("/gather/proposal/info", require("./routes/proposals/gatherBriefJobInfo.js"));
app.use("/gather/pics/friends", require("./routes/profile/friends/gatherProfilePics.js"));
app.use("/get/picture/only/friends/list", require("./routes/profile/friends/getProfilePic.js"));
app.use("/mark/notification/read", require("./routes/notifications/markRead.js"));
app.use("/gather/applicants/jobs", require("./routes/applicants/manage/gatherAllApplicants.js"));
app.use("/gather/breif/info/applicant", require("./routes/applicants/manage/gatherBreifInfo.js"));
app.use("/gather/jobs/per/user", require("./routes/applicants/manage/gatherJobs.js"));
app.use("/gather/applicant/info", require("./routes/applicants/manage/individual/gatherApplicantInfo.js"));
app.use("/delete/proposal/applicant", require("./routes/applicants/manage/individual/deleteApplicant.js"));
app.use("/gather/more/previously/applied/proposals", require("./routes/proposals/gatherMoreSubmittedProposals.js"));
app.use("/gather/previously/applied/proposals/limited", require("./routes/proposals/gatherAlreadySubittedTwo.js"));
app.use("/notify/interview/candidate", require("./routes/applicants/manage/individual/interviewApplicantStart.js"));
app.use("/remove/applicant/job/applicants", require("./routes/applicants/manage/individual/removeApplicantToInterview.js"));
app.use("/gather/user/pics/only", require("./routes/onlyGatherUserPicture.js"));
app.use("/send/video/invite/candidate", require("./routes/applicants/interview/sendVideoInviteRequest.js"));
app.use("/check/active/inteviews/match", require("./routes/applicants/interview/checkActiveInterview.js"));
app.use("/get/active/invitations/interview", require("./routes/applicants/interview/gatherActiveInterviews.js"));
app.use("/gather/twilio/conference/information", require("./routes/applicants/video/gatherTwilioVideoInformation.js"));
app.use("/delete/notification", require("./routes/notifications/deleteNotification.js"));
app.use("/hire/applicant/job", require("./routes/applicants/interview/selectCanidate/selectCanidateHire.js"));
app.use("/remove/job/from/collection", require("./routes/applicants/interview/selectCanidate/removeCanidate.js"));
app.use("/gather/more/users/list", require("./routes/people/listUsers/gatherMoreUsers.js"));
app.use("/like/react/post/wall", require("./routes/wall/mainWall/react/reactToPostLike.js"));
app.use("/like/react/post/wall/revoke/remove", require("./routes/wall/mainWall/react/revokeLike.js"));
app.use("/gather/users/liked/post/additional/info", require("./routes/wall/mainWall/gatherInformation/gatherPeopleReactedMore.js"));
app.use("/gather/more/basic/info", require("./routes/gatherBasicInfo.js")); // universal route 
app.use("/change/visibility/type/posts", require("./routes/wall/visibility/changeVisibility.js"));
app.use("/check/visibility", require("./routes/wall/visibility/check.js")); 
app.use("/share/post/wall/others", require("./routes/wall/newWallPost/sharePost/share.js"));
app.use("/like/react/post/wall/shared/posting", require("./routes/wall/mainWall/react/shared/likeSharedWallPost.js"));
app.use("/gather/breif/information/about/user/custom", require("./routes/wall/gatherPosts/gatherUserInformationBriefCustom.js"));
app.use("/like/react/post/wall/revoke/remove/shared", require("./routes/wall/mainWall/react/shared/revokeSharedLike.js"));
app.use("/gather/more/wall/posts/unique", require("./routes/wall/gatherPosts/gatherMore/gatherMorePosts.js"));
app.use("/gather/users/usernames/fullnames/friends", require("./routes/wall/tagging/locateAndTagFriends.js"));
app.use("/locate/unique_id/by/username", require("./routes/wall/mainWall/locateByUsername/locateUserByUsername.js"));
app.use("/upload/video/prep/wall/post", require("./routes/wall/newWallPost/uploadVideo/uploadVideoWallPrep.js"));
app.use("/gather/user/wall/posts/individual", require("./routes/people/individual/wall/gatherIndividualWallPosts.js"));
app.use("/upload/hours/schedule", require("./routes/profile/hours/uploadNewHours.js")); 
app.use("/upload/school/history", require("./routes/profile/schooling/updateHistory/uploadSchoolingHistory.js"));
app.use("/gather/employment/history", require("./routes/profile/schooling/gatherHistory/gatherSchoolHistory.js"));
app.use("/delete/employment/history/record", require("./routes/profile/schooling/deleteSchooling/deleteRecordSchooling.js"));
app.use("/filter/search/jobs/query", require("./routes/jobs/filteredSearch/searchWithFilter.js"));
app.use("/search/jobs/for/term", require("./routes/jobs/filteredSearch/customTypingSearch.js"));
app.use("/post/question/discussion/board", require("./routes/forums/postNewForum/createNewForum.js"));
app.use("/gather/forums/posts", require("./routes/forums/gatherPosts/gatherForumPosts.js"));
app.use("/upvote/forum/posting", require("./routes/forums/upvoteDownvote/handleUpvote.js"));
app.use("/downvote/forum/posting", require("./routes/forums/upvoteDownvote/handleDownvote.js"));
app.use("/handle/forum/post/like/response", require("./routes/forums/emojiResponses/like/likePostWithEmoji.js"));
app.use("/update/comments/forum/posting", require("./routes/forums/comments/dropComment/leaveAComment.js"));
app.use("/fetch/comments/forum/feed/update", require("./routes/forums/comments/gatherUpdated/gatherUpdatedComments.js"));
app.use("/upvote/subcomment/comment", require("./routes/forums/comments/likesDislikes/like/addLikeSubComment.js"));
app.use("/downvote/subcomment/comment", require("./routes/forums/comments/likesDislikes/dislike/removeLikeSubComment.js"));
app.use("/delete/comment/forums/thread", require("./routes/forums/comments/delete/deleteComment.js"));
app.use("/gather/active/gigs/jobs", require("./routes/activeGigs/home/gatherActiveJobsGigs.js"));
app.use("/gather/agreement/details/and/job", require("./routes/activeGigs/individual/gatherGigData.js"));
app.use("/gather/active/live/jobs", require("./routes/activeGigs/listOfJobs/gatherListOfJobs.js"));
app.use("/fetch/specific/job/active", require("./routes/activeGigs/individual/gatherJobByID.js"));
app.use("/make/full/payment/entire", require("./routes/activeGigs/individual/payments/makeCompleteFullPaymentIndividual.js"));
app.use("/check/active/debit/credit/cards", require("./routes/account/payments/payments/check/checkForPaymentMethods.js"));
app.use("/make/quick/payment/partial", require("./routes/activeGigs/individual/payments/partialQuick/makePartialQuickPayment.js"));
app.use("/gather/onboarding/links", require("./routes/auth/stripeOnboarding/links/createLinks.js"));
app.use("/make/custom/payment/one", require("./routes/activeGigs/individual/payments/custom/makeCustomPayment.js"));
app.use("/make/set/payment/hourly/min", require("./routes/activeGigs/individual/payments/hourly/makeHourlyMultiplePayment.js"));
app.use("/make/custom/hourly/payment", require("./routes/activeGigs/individual/payments/hourly/customPaymentHourly.js"));
app.use("/upload/profile/pic/video/android", require("./routes/profile/videos/uploadExistingVideoAndroid.js"));
app.use("/post/files/upload/client", require("./routes/activeGigs/files/uploadFiles.js"));
app.use("/delete/file/from/application", require("./routes/activeGigs/files/deleteRemoveFile.js"));
app.use("/gather/uploaded/files", require("./routes/activeGigs/files/gather/gatherFiles.js"));
app.use("/complete/freelance/gig/half/freelancer", require("./routes/activeGigs/completion/freelancer/markCompleteHalf.js"));
app.use("/locate/specific/active/job", require("./routes/notifications/gatherJob.js"));
app.use("/gather/application/data", require("./routes/activeGigs/files/gather/gatherApplicationData.js"));
app.use("/delete/link/url", require("./routes/activeGigs/links/deleteLink.js"));
app.use("/complete/client/gig/half/client", require("./routes/activeGigs/completion/client/markCompleteHalf.js"));
app.use("/get/interview/fetch/single/notifications", require("./routes/notifications/interviews/findInterviewById.js"));
app.use("/make/milestone/payment/specific", require("./routes/activeGigs/individual/payments/milestones/makeMilestonePaymentIndividual.js"));
app.use("/make/remainder/payment/milestones", require("./routes/activeGigs/individual/payments/milestones/makeRemainderPayment.js"));
app.use("/gather/completed/jobs/logged/in/only", require("./routes/completedGigs/gather/gatherCompletedGigs.js"));
app.use("/gather/remaining/tokens", require("./routes/tokens/gatherRemaining.js"));
app.use("/post/review/as/employer", require("./routes/reviews/employer/leaveReview.js"));
app.use("/post/review/as/worker", require("./routes/reviews/worker/leaveReview.js"));
app.use("/post/comment/wall/posting/sub", require("./routes/wall/comments/subComments/postCommentIndividualWall.js"));
app.use("/gather/brief/info/name/and/pictures", require("./routes/photoAndNameOnly.js"));
app.use("/gather/post/comments", require("./routes/wall/comments/gatherCommentsById.js"));
app.use("/post/comment/wall/posting/sub/reply/sub", require("./routes/wall/comments/subComments/sub/postSubComment.js"));
app.use("/update/bio", require("./routes/profile/bio/updateBio.js"));
app.use("/delete/sub/comment/own", require("./routes/wall/comments/subComments/delete/deleteSubComment.js"));
app.use("/delete/main/comment/own", require("./routes/wall/comments/mainComments/delete/deleteMainComment.js"));
app.use("/gather/jobs/by/location/nearby", require("./routes/jobs/gatherJobs/location/gatherJobsByLocation.js"));
app.use("/filter/people/specifics", require("./routes/people/listUsers/filter/filterByAll.js"));
//////////////////////////////////////////////// below - get rid of these potentially - below ///////////////////////////////////////
app.use("/gather/users/account/type", require("./routes/people/listUsers/filter/accountType/gatherByAccountType.js"));
app.use("/gather/users/age/range", require("./routes/people/listUsers/filter/ageRange/gatherByAgeRange.js"));
//////////////////////////////////////////////// ^^^^^^^^^^^^^^ get rid of these potentially ^^^^^^^^^^^^^^ ///////////////////////////////////////
app.use("/stripe/webhook", require("./routes/webhooks/stripe/webhook.js"));
app.use("/gather/friends/by/name", require("./routes/friends/query/findFriendsByName.js"));

app.get('*', function(req, res) {
  res.sendFile(__dirname, './client/public/index.html')
})

app.get('*', cors(), function(_, res) {
	res.sendFile(__dirname, './client/build/index.html'), function(err) {
	  if (err) {
		res.status(500).send(err)
	  };
	};
});
    
app.get('/*', cors(), function(_, res) {
	res.sendFile(__dirname, './client/build/index.html'), function(err) {
		if (err) {
		res.status(500).send(err)
		};
	};
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	next();
});

if (process.env.NODE_ENV === "production") {
	// Express will serve up production files
	app.use(express.static("client/build"));
	// serve up index.html file if it doenst recognize the route
	app.get('*', cors(), function(_, res) {
	res.sendFile(__dirname, './client/build/index.html'), function(err) {
		if (err) {
		res.status(500).send(err)
		}
	}
	})
	app.get('/*', cors(), function(_, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
		if (err) {
		res.status(500).send(err)
		}
	})
	})
}; 


io.on("connection", socket => {

	console.log("New client connected");

	socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});
