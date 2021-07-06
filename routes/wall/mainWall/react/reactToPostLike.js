const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, responseeeeee) => {

        const { id, post, like } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ "wallPosts.id": post.id }).then((userrrrrrr) => {
            if (userrrrrrr) {

                for (let index = 0; index < userrrrrrr.wallPosts.length; index++) {
                    const wallPost = userrrrrrr.wallPosts[index];
                    // if post matches the post reacted to
                    if (wallPost.id === post.id) {

                        const newPerson = {
                            id: uuidv4(),
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            systemDate: Date.now(),
                            reactingPersonID: id,
                            reaction: like
                        };

                        wallPost.reactions[like] += 1;

                        wallPost.peopleReacted.push(newPerson);

                        wallPost.peopleReactedIDs.push(id);

                        axios.get(`${config.get("ngrok_url")}/gather/more/basic/info`, {
                            params: {
                                userID: post.poster
                            }
                        }).then((res) => {
                            if (res.data.message === "Located the desired user!") {

                                const { user } = res.data;

                                collection.save(userrrrrrr).then(() => {


                                    delete userrrrrrr.loginPassword;
                                    delete userrrrrrr.cometChatAuthToken;
                                    delete userrrrrrr.phoneNumber;
                                    delete userrrrrrr.loginEmail;
                                    delete userrrrrrr.loginUsername;
                                    delete userrrrrrr.userCurrentLocation;
                                    delete userrrrrrr.stripeCustomerAccount;
                                    delete userrrrrrr.skillsApiToken;
                                    delete userrrrrrr.firebasePushNotificationToken;
                                    delete userrrrrrr.twilioJWTAuthToken;
                                    delete userrrrrrr.sentFriendRequests;
                                    delete userrrrrrr.pendingInterviews;
                                    delete userrrrrrr.cardPaymentMethods;

                                    wallPost.firstName = user.firstName;
                                    wallPost.lastName = user.lastName;
                                    wallPost.accountType = user.accountType;
                                    wallPost.username = user.username;
                                    wallPost.birthdate = user.birthdate;
                                    wallPost.profilePics = user.profilePics;

                                    responseeeeee.json({
                                        message: "Reacted to post!",
                                        post: wallPost,
                                        alteredID: wallPost.id
                                    })
                                });
                            } else {
                                console.log("Errr:", res.data)
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }
            } else {
                responseeeeee.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;