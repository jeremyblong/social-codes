const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const _ = require("lodash");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const accountSid = config.get("twilioAccountSID");
const authToken = config.get("twilioAuthToken");
const client = require('twilio')(accountSid, authToken);

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { 
            fullTime,
            timezone,
            actualTime,
            id,
            date,
            otherUserID,
            jobID,
            twilioRoomSID,
            twilioRoomID
        } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [ id, otherUserID ]}}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Could NOT locate any users...",
                    err
                })
            } else {

                const generatedID = uuidv4();

                client.video.rooms(twilioRoomSID).fetch().then(room => {

                    console.log(room.sid);
                
                    const promiseee = new Promise((resolve, reject) => {
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            // signed in user
                            if (user.unique_id === id) {
                            
                                const invitationData = {
                                    id: generatedID,
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    systemDate: Date.now(),
                                    confirmed: false,
                                    fullTime,
                                    timezone,
                                    actualTime,
                                    day: date,
                                    hostID: otherUserID,
                                    with: otherUserID,
                                    jobID,
                                    twilioRoomID: jobID,
                                    twilioRoomSID: room.sid
                                };
    
                                if (user.activeInterviews) {
                                    user.activeInterviews.push(invitationData);
                                } else {
                                    user["activeInterviews"] = [invitationData];
                                }
    
                                collection.save(user);
    
    
                                resolve(user);
                            }
                        }
                    })
    
                    promiseee.then((passedValue) => {
    
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            // other user - applicant
                            if (user.unique_id === otherUserID) {

                                const configgg = {
                                    headers: {
                                        "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                        "Content-Type": "application/json"
                                    }
                                };

                                const notificationAddition = {
                                    id: uuidv4(),
                                    system_date: Date.now(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    data: {
                                        title: `${user.username} started a video call with you!`,
                                        body: `${user.firstName} ${user.lastName} inititated a video call with you, please join the meeting now as they are waiting for you to join.`,
                                    },
                                    from: id,
                                    link: "video-conference",
                                    twilioRoomID: jobID,
                                    twilioRoomSID: room.sid
                                };
                                const invitationData = {
                                    id: generatedID,
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    systemDate: Date.now(),
                                    confirmed: false,
                                    fullTime,
                                    timezone,
                                    actualTime,
                                    day: date,
                                    hostID: otherUserID,
                                    with: id,
                                    jobID,
                                    twilioRoomID: jobID,
                                    twilioRoomSID: room.sid
                                };
    
                                if (user.activeInterviews) {
                                    user.activeInterviews.push(invitationData);
                                } else {
                                    user["activeInterviews"] = [invitationData];
                                }

                                axios.post("https://fcm.googleapis.com/fcm/send", {
                                    "to": user.firebasePushNotificationToken,
                                    "notification": {
                                        'title': `${user.username} started a video call with you!`,
                                        'body': `${user.firstName} ${user.lastName} inititated a video call with you, please join the meeting now as they are waiting for you to join.`,
                                        "mutable_content": true,
                                        "sound": "Tri-tone"
                                    },
                                    "data": {
                                        "url": `${config.get("logoImage")}`,
                                        "dl": "notifications"
                                    }
                                }, configgg).then((responseeee) => {
        
                                    console.log("RES", responseeee.data);
                
                                    if (user.notifications) {
                                        user.notifications.push(notificationAddition);
                                    } else {
                                        user["notifications"] = [notificationAddition];
                                    }
                                    
                                    collection.save(user);
    
                                    res.json({
                                        message: "Located and updated both users!"
                                    }) 
                                }).catch((err) => {
                                    console.log(err);
                                }) 
                            }
                        }
                    })
                }).catch((err) => {
                    console.log(err);

                    res.json({
                        err,
                        message: "Critical error..."
                    })
                });
            }
        })
    });
});

module.exports = router;