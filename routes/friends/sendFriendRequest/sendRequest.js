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
    router.post("/", (req, response) => {

        const { 
            requesteeId,
            requesteeFullName,
            otherUserId,
            username
        } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [ requesteeId, otherUserId ]}}).toArray((err, users) => {
            if (err) {
                console.log(err);

                response.json({
                    message: "An error occurred...",
                    err
                })
            } else {

                const generatedID = uuidv4();

                const promiseee = new Promise((resolve, reject) => {
                    for (let i = 0; i < users.length; i++) {
                        const user = users[i];
                        // other user
                        if (user.unique_id === otherUserId) {

                            const configgg = {
                                headers: {
                                    "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                    "Content-Type": "application/json"
                                }
                            }
            
                            const notificationAddition = {
                                id: uuidv4(),
                                system_date: Date.now(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                data: {
                                    title: `You have a new friend request from ${requesteeFullName}`,
                                    body: `${requesteeFullName} sent you a friend request, check out your new potential friend!`,
                                },
                                from: requesteeId,
                                link: "friend-request"
                            };
            
                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                "to": user.firebasePushNotificationToken,
                                "notification": {
                                    "title": `You have a new friend request from ${requesteeFullName}`,
                                    "body": `${requesteeFullName} sent you a friend request, check out your new potential friend!`,
                                    "mutable_content": true,
                                    "sound": "Tri-tone"
                                },
                                "data": {
                                    // use company logo 
                                    "url": `${config.get("logoImage")}`,
                                    "dl": "notifications"
                                    // use company logo ^^^^^^^^^^^^^^^^^^^^^^^^^
                                }
                            }, configgg).then((res) => {
    
                                console.log("RES", res.data);
            
                                const newData = {
                                    id: generatedID,
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    systemDate: Date.now(),
                                    requestee: requesteeId,
                                    status: "pending",
                                    requesteeName: requesteeFullName,
                                    read: false,
                                    otherUserUsername: username
                                };
                                if (user.friendRequests) {
                                    user.friendRequests.push(newData);
                                } else {
                                    user["friendRequests"] = [newData];
                                }

                                if (user.notifications) {
                                    user.notifications.push(notificationAddition);
                                } else {
                                    user["notifications"] = [notificationAddition];
                                }
                                
                                collection.save(user);
    
                                resolve(user);
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    }
                })

                promiseee.then((passedData) => {
                    for (let i = 0; i < users.length; i++) {
                        const user = users[i];
    
                        // signed-in user
                        if (user.unique_id === requesteeId) {

                            const newData = {
                                id: generatedID,
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                systemDate: Date.now(),
                                otherUser: otherUserId,
                                otherUserName: `${passedData.firstName} ${passedData.lastName}`,
                                status: "pending",
                                otherUserUsername: passedData.username
                            };

                            if (user.sentFriendRequests) {
                                user.sentFriendRequests.push(newData);
                            } else {
                                user["sentFriendRequests"] = [newData];
                            }

                            collection.save(user);
                            
                            response.json({
                                message: "Sent friend request!"
                            })
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;