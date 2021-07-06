const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const axios = require("axios");
const _ = require("lodash");
const accountSid = config.get("twilioAccountSID");
const authToken = config.get("twilioAuthToken");
const client = require('twilio')(accountSid, authToken);


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { applicant, id, fullName, job } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [ id, applicant.applicant ]}}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Critical error occurred...",
                    err
                })
            } else {


                client.video.rooms.create({
                    enableTurn: true,
                    statusCallback: 'http://example.org',
                    type: 'peer-to-peer',
                    uniqueName: job.unique_id
                }).then((room) => {

                    console.log(room.sid);


                    const promiseee = new Promise((resolve, reject) => {
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            
                            // other user
                            if (user.unique_id === applicant.applicant) {
                                console.log("other user", user);
    
                                const notificationAddition = {
                                    id: uuidv4(),
                                    system_date: Date.now(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    data: {
                                        title: `${fullName} wants to interview you!`,
                                        body: `${fullName} would like to interview you as a potential candiate for a freelance gig they posted that you applied to...!`,
                                    },
                                    from: id,
                                    link: "interview"
                                };
    
                                const interviewInvitation = {
                                    id: uuidv4(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    system_date: Date.now(),
                                    interviewerID: id,
                                    jobData: job,
                                    otherUserID: id,
                                    otherUserName: fullName,
                                    relatedJobID: job.unique_id,
                                    active: false,
                                    twilioRoomID: job.unique_id,
                                    interviewer: false,
                                    twilioRoomSID: room.sid
                                };  
    
                                if (user.pendingInterviews) {
                                    user.pendingInterviews.push(interviewInvitation);
                                } else {
                                    user["pendingInterviews"] = [interviewInvitation];
                                }
    
                                const configgg = {
                                    headers: {
                                        "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                        "Content-Type": "application/json"
                                    }
                                }
    
                                axios.post("https://fcm.googleapis.com/fcm/send", {
                                    "to": user.firebasePushNotificationToken,
                                    "notification": {
                                        "title": `${fullName} wants to interview you!`,
                                        "body": `${fullName} would like to interview you as a potential candiate for a freelance gig they posted that you applied to...!`,
                                        "mutable_content": true,
                                        "sound": "Tri-tone"
                                    },
                                    "data": {
                                        "url": `${config.get("logoImage")}`,
                                        "dl": "notifications"
                                    }
                                }, configgg).then((res) => {
        
                                    console.log("RES", res.data);
                
                                    if (user.notifications) {
                                        user.notifications.push(notificationAddition);
                                    } else {
                                        user["notifications"] = [notificationAddition];
                                    }
                                    
                                    axios.post(`${config.get("ngrok_url")}/remove/applicant/job/applicants`, {
                                        applicant
                                    }).then((responseeeeee) => {
                                        if (responseeeeee.data.message === "Removed applicant") {
                                             
    
                                            collection.save(user);
    
                                            resolve(user);
                                        } else {
                                            res.json({
                                                message: "Error occurred while removing applicant from applicant list..."
                                            })
                                        }
                                    }).catch((errorrrrrrr) => {
                                        console.log(errorrrrrrr)
                                    })
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                        }
                    })
    
                    promiseee.then((passedValue) => {
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            
                            // signed in user
                            if (user.unique_id === id) {
                                console.log("signed in user", user);
    
    
                                const interviewInvitation = {
                                    id: uuidv4(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    system_date: Date.now(),
                                    interviewerID: id,
                                    jobData: job,
                                    otherUserID: passedValue.unique_id,
                                    otherUserName: `${passedValue.firstName} ${passedValue.lastName}`,
                                    relatedJobID: job.unique_id,
                                    twilioRoomID: job.unique_id,
                                    active: false,
                                    interviewer: true,
                                    twilioRoomSID: room.sid
                                };  
    
                                if (user.pendingInterviews) {
                                    user.pendingInterviews.push(interviewInvitation);
                                } else {
                                    user["pendingInterviews"] = [interviewInvitation];
                                }
    
                                collection.save(user);

                                res.json({
                                    message: "Successfully ran logic!",
                                    roomID: room.sid
                                })
                            }
                        }
                    })
                }).catch((err) => {
                    console.log(err);

                    if (err.message === "Room exists") {

                        client.video.rooms(job.unique_id).fetch().then(room => {

                            console.log(room.sid);

                            const promiseee = new Promise((resolve, reject) => {
                                for (let index = 0; index < users.length; index++) {
                                    const user = users[index];
                                    
                                    // other user
                                    if (user.unique_id === applicant.applicant) {
                                        console.log("other user", user);
            
                                        const notificationAddition = {
                                            id: uuidv4(),
                                            system_date: Date.now(),
                                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            data: {
                                                title: `${fullName} wants to interview you!`,
                                                body: `${fullName} would like to interview you as a potential candiate for a freelance gig they posted that you applied to...!`,
                                            },
                                            from: id,
                                            link: "interview"
                                        };
            
                                        const interviewInvitation = {
                                            id: uuidv4(),
                                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            system_date: Date.now(),
                                            interviewerID: id,
                                            jobData: job,
                                            otherUserID: id,
                                            otherUserName: fullName,
                                            relatedJobID: job.unique_id,
                                            active: false,
                                            twilioRoomID: job.unique_id,
                                            interviewer: false,
                                            twilioRoomSID: room.sid
                                        };  
            
                                        if (user.pendingInterviews) {
                                            user.pendingInterviews.push(interviewInvitation);
                                        } else {
                                            user["pendingInterviews"] = [interviewInvitation];
                                        }
            
                                        const configgg = {
                                            headers: {
                                                "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                                "Content-Type": "application/json"
                                            }
                                        }
            
                                        axios.post("https://fcm.googleapis.com/fcm/send", {
                                            "to": user.firebasePushNotificationToken,
                                            "notification": {
                                                "title": `${fullName} wants to interview you!`,
                                                "body": `${fullName} would like to interview you as a potential candiate for a freelance gig they posted that you applied to...!`,
                                                "mutable_content": true,
                                                "sound": "Tri-tone"
                                            },
                                            "data": {
                                                "url": `${config.get("logoImage")}`,
                                                "dl": "notifications"
                                            }
                                        }, configgg).then((res) => {
                
                                            console.log("RES", res.data);
                        
                                            if (user.notifications) {
                                                user.notifications.push(notificationAddition);
                                            } else {
                                                user["notifications"] = [notificationAddition];
                                            }
                                            
                                            axios.post(`${config.get("ngrok_url")}/remove/applicant/job/applicants`, {
                                                applicant
                                            }).then((responseeeeee) => {
                                                if (responseeeeee.data.message === "Removed applicant") {
                                                     
            
                                                    collection.save(user);
            
                                                    resolve(user);
                                                } else {
                                                    res.json({
                                                        message: "Error occurred while removing applicant from applicant list..."
                                                    })
                                                }
                                            }).catch((errorrrrrrr) => {
                                                console.log(errorrrrrrr)
                                            })
                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                    }
                                }
                            })
            
                            promiseee.then((passedValue) => {
                                for (let index = 0; index < users.length; index++) {
                                    const user = users[index];
                                    
                                    // signed in user
                                    if (user.unique_id === id) {
                                        console.log("signed in user", user);
            
            
                                        const interviewInvitation = {
                                            id: uuidv4(),
                                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            system_date: Date.now(),
                                            interviewerID: id,
                                            jobData: job,
                                            otherUserID: passedValue.unique_id,
                                            otherUserName: `${passedValue.firstName} ${passedValue.lastName}`,
                                            relatedJobID: job.unique_id,
                                            twilioRoomID: job.unique_id,
                                            active: false,
                                            interviewer: true,
                                            twilioRoomSID: room.sid
                                        };  
            
                                        if (user.pendingInterviews) {
                                            user.pendingInterviews.push(interviewInvitation);
                                        } else {
                                            user["pendingInterviews"] = [interviewInvitation];
                                        }
            
                                        collection.save(user);
        
                                        res.json({
                                            message: "Successfully ran logic!",
                                            roomID: room.sid
                                        })
                                    }
                                }
                            })
                        });
                    }
                });
            }
        });
    });
});

module.exports = router;