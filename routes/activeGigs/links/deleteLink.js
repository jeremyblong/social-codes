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
    router.put("/", (req, resppppppppp) => {

        const { linkID, id, activeID, otherUserID, fullName, jobID } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [id, otherUserID ]}}).toArray((err, users) => {
            if (err) {
                resppppppppp.json({
                    message: "ERROR occurred locating users...",
                    err
                })
            } else {

                const promise = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // logged in user - freelancer
                        if (user.unique_id === id) {
                            for (let index = 0; index < user.activeHiredApplicants.length; index++) {
                                const applicant = user.activeHiredApplicants[index];
                                // find matching application
                                if (applicant.id === activeID) {
                                    for (let iiii = 0; iiii < applicant.links.length; iiii++) {
                                        const link = applicant.links[iiii];
                                        // check for matching link and remove it
                                        if (link.id === linkID) {
                                            applicant.links.splice(index, 1);
            
                                            collection.save(user, (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    resolve(user);
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                })

                promise.then((passedUser) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // other user - client
                        if (user.unique_id === otherUserID) {

                            for (let index = 0; index < user.activeHiredApplicants.length; index++) {
                                const applicant = user.activeHiredApplicants[index];
                                // find matching application
                                if (applicant.id === activeID) {
                                    for (let iiii = 0; iiii < applicant.links.length; iiii++) {
                                        const link = applicant.links[iiii];
                                        // check for matching link and remove it
                                        if (link.id === linkID) {
                                            applicant.links.splice(index, 1);
            
                                            const configgg = {
                                                headers: {
                                                    "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                                    "Content-Type": "application/json"
                                                }
                                            }
                            
                                            const notification_addition = {
                                                id: uuidv4(),
                                                system_date: Date.now(),
                                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                                data: {
                                                    title: `${fullName} has deleted a link for a project you're involved in...`,
                                                    body: `${fullName} has deleted a link they previously uploaded, this is usually a URL for completed work. If you think this change was an accident, please contact the user...`,
                                                    data: {
                                                        jobID,
                                                        with: id,
                                                        id: activeID
                                                    }
                                                },
                                                from: user.unique_id,
                                                link: "files-pending-project",
                
                                            };
                            
                                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                                "to": user.firebasePushNotificationToken,
                                                "notification": {
                                                    "title": `${fullName} has deleted a link for a project you're involved in...`,
                                                    "body": `${fullName} has deleted a link they previously uploaded, this is usually a URL for completed work. If you think this change was an accident, please contact the user...`,
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
                                                    user.notifications.push(notification_addition);
                                                } else {
                                                    user["notifications"] = [notification_addition];
                                                }
                
                                                collection.save(user, (err, result) => {
                                                    if (err) {
                                                        console.log("err occurred while saving db info", err);
                                                    } else {
                                                        resppppppppp.json({
                                                            message: "Deleted!",
                                                            links: applicant.links
                                                        })
                                                    }
                                                });
                            
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;