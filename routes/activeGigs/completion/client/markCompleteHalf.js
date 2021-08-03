const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, resppppppppp) => {

        const { id, activeID, otherUserID } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [ id, otherUserID ]}}).toArray((err, users) => {
            if (err) {
                console.log(err);

                resppppppppp.json({
                    message: "Error occurred!",
                    err
                })
            } else {

                const configgg = {
                    headers: {
                        "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                        "Content-Type": "application/json"
                    }
                }
                
                // handle logged in user logic
                const promise = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // logged in user - freelancer
                        if (user.unique_id === id) {
                            for (let iiii = 0; iiii < user.activeHiredApplicants.length; iiii++) {
                                const applicant = user.activeHiredApplicants[iiii];
                                
                                if (applicant.id === activeID) {

                                    applicant.completedClient = true;

                                    if (applicant.completedFreelancer === true && applicant.completedClient === true) {

                                        if (_.has(user, "completedProjects")) {
                                            user.completedProjects.push(applicant);
                                        } else {
                                            user["completedProjects"] = [applicant];
                                        }

                                        user.activeHiredApplicants.splice(iiii, 1);

                                        collection.save(user, (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                resolve({
                                                    user,
                                                    bool: applicant.completedFreelancer
                                                });
                                            }
                                        })
                                    } else {
                                        collection.save(user, (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                resolve({
                                                    user,
                                                    bool: applicant.completedFreelancer
                                                });
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }
                })
                // handle other user logic
                promise.then((values) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // other user - client
                        if (user.unique_id === otherUserID) {
                            // loop through applicants
                            for (let iiii = 0; iiii < user.activeHiredApplicants.length; iiii++) {
                                const applicant = user.activeHiredApplicants[iiii];
                                
                                if (applicant.id === activeID) {
                                    // mark as complete for both users
                                    applicant.completedClient = true;
                                    // save data/changes
                                    
                                    // check to make sure all parties have marked as complete and capture payment
                                    if (values.bool === true && applicant.completedClient === true) {

                                        // take payment - capture previous received payment

                                        if (_.has(user, "completedProjects")) {
                                            user.completedProjects.push(applicant);
                                        } else {
                                            user["completedProjects"] = [applicant];
                                        }

                                        const promises = [];

                                        for (let iiiiiii = 0; iiiiiii < applicant.payments.length; iiiiiii++) {
                                            const payment = applicant.payments[iiiiiii];
                                            
                                            promises.push(new Promise((resolve, reject) => {
                                                return stripe.paymentIntents.capture(
                                                    payment.id
                                                ).then((result) => {
                                                    console.log(result);
                                                    resolve();
                                                }).catch((error) => {
                                                    console.log(error);
                                                    reject();
                                                });
                                            }))
                                        }

                                        Promise.all(promises).then((finalValues) => {

                                            // send off notification
                                            const notificationAddition = {
                                                id: uuidv4(),
                                                system_date: Date.now(),
                                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                                data: {
                                                    title: `${values.user.firstName} ${values.user.lastName} has marked a project your linked to as 'complete'...`,
                                                    body: `${values.user.firstName} ${values.user.lastName} has said they have completed a project they're working on for you, check to see what work they've submitted and validate if the work is completed...`,
                                                },
                                                from: id,
                                                link: "submitted-work"
                                            };
                                            
                                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                                "to": user.firebasePushNotificationToken,
                                                "notification": {
                                                    "title":   `${values.user.firstName} ${values.user.lastName} has marked a project your linked to as 'complete'...`,
                                                    "body": `${values.user.firstName} ${values.user.lastName} has said they have completed a project they're working on for you, check to see what work they've submitted and validate if the work is completed...`,
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

                                                user.activeHiredApplicants.splice(iiii, 1);
                                                
                                                collection.save(user, (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        resppppppppp.json({
                                                            message: "Successfully updated users accounts and posted notification && finished/completed job!"
                                                        })
                                                    }
                                                });
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                        })
                                    } else {
                                        const notificationAddition = {
                                            id: uuidv4(),
                                            system_date: Date.now(),
                                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            data: {
                                                title: `${values.user.firstName} ${values.user.lastName} has marked a project your linked to as 'complete'...`,
                                                body: `${values.user.firstName} ${values.user.lastName} has said they have completed a project they're working on for you, check to see what work they've submitted and validate if the work is completed...`,
                                            },
                                            from: id,
                                            link: "submitted-work"
                                        };
                                        
                                        axios.post("https://fcm.googleapis.com/fcm/send", {
                                            "to": user.firebasePushNotificationToken,
                                            "notification": {
                                                "title":   `${values.user.firstName} ${values.user.lastName} has marked a project your linked to as 'complete'...`,
                                                "body": `${values.user.firstName} ${values.user.lastName} has said they have completed a project they're working on for you, check to see what work they've submitted and validate if the work is completed...`,
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
                                            
                                            collection.save(user, (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    resppppppppp.json({
                                                        message: "Successfully updated users accounts and posted notification!"
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
                })
            }
        })
    });
});

module.exports = router;