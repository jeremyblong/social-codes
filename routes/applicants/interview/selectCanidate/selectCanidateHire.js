const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, respppp) => {

        const { id, interview, firstName, lastName, username } = req.body;

        console.log(req.body);

        const database = db.db("db");

        const collection = database.collection("users");

        const generatedID = uuidv4();

        collection.find({ unique_id: { $in: [ id, interview.with ]}}).toArray((err, users) => {
            if (err) {

                console.log("ERR:", err);

                respppp.json({
                    err,
                    message: "Critical error occurred..."
                })
            } else {
                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        
                        if (user.unique_id === id) {
                            axios.put(`${config.get("ngrok_url")}/remove/job/from/collection`, {
                                interview
                            }).then((response) => {
                                if (response.data.message === "Deleted job!") {
            
                                    console.log(response.data);
            
                                    const newApplicant = {
                                        id: generatedID,
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        systemDate: Date.now(),
                                        jobID: interview.jobID,
                                        twilioRoomID: interview.twilioRoomID,
                                        twilioRoomSID: interview.twilioRoomSID,
                                        otherUserFirstName: interview.firstName,
                                        otherUserLastName: interview.lastName,
                                        otherUserUsername: interview.username,
                                        with: interview.with,
                                        paidFull: false,
                                        paidPartial: false,
                                        payments: []
                                    };
            
                                    if (user.activeHiredApplicants) {
                                        user.activeHiredApplicants.push(newApplicant);
                                    } else {
                                        user["activeHiredApplicants"] = [newApplicant];
                                    }
            
                                    collection.save(user);
            
                                    resolve(user);
                                } else {
                                    console.log("err", response.data);

                                    reject(user);
                                }
                            }).catch((error) => {
                                console.log(error);

                                reject(user);
                            })
                        }
                    }
                })

                promiseee.then((passedData) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // other user
                        if (user.unique_id === interview.with) {
                            
                            const newApplicant = {
                                id: generatedID,
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                systemDate: Date.now(),
                                jobID: interview.jobID,
                                twilioRoomID: interview.twilioRoomID,
                                twilioRoomSID: interview.twilioRoomSID,
                                otherUserFirstName: firstName,
                                otherUserLastName: lastName,
                                otherUserUsername: username,
                                with: id,
                                paidFull: false,
                                paidPartial: false,
                                payments: []
                            };
    
                            if (user.activeHiredApplicants) {
                                user.activeHiredApplicants.push(newApplicant);
                            } else {
                                user["activeHiredApplicants"] = [newApplicant];
                            }

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
                                    title: `${firstName} ${lastName} decided to HIRE YOU for a job you interviewed for! Congratulations on your new gig!`,
                                    body: `You have been selected out of all the canidates to work on this gig, to get started view the "active Gigs/Jobs" section in the menu to learn more...`,
                                },
                                from: id,
                                link: "accepted-job-interview"
                            };
            
                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                "to": user.firebasePushNotificationToken,
                                "notification": {
                                    "title": `${firstName} ${lastName} decided to HIRE YOU for a job you interviewed for! Congratulations on your new gig!`,
                                    "body": `You have been selected out of all the canidates to work on this gig, to get started view the "active Gigs/Jobs" section in the menu to learn more...`,
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

                                if (user.notifications) {
                                    user.notifications.push(notificationAddition);
                                } else {
                                    user["notifications"] = [notificationAddition];
                                }
                                
                                collection.save(user);

                                respppp.json({
                                    message: "Hired user!",
                                    user
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;