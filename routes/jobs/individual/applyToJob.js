const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');;
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const axios = require("axios");

const isEmpty = (obj) => {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
}

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, resppp) => {
    
        const database = db.db("db");

        const collection = database.collection("users");

        const jobsCollection = database.collection("jobs");

        const { 
            milestone1, 
            milestone2, 
            milestone3, 
            milestone4, 
            milestone5,
            milestone6, 
            milestone7, 
            milestone8, 
            milestone,
            duration, 
            myBid,
            question0, 
            question1, 
            question2,
            question3, 
            question4,
            coverLetterText,
            otherUser,
            signedInUser,
            jobID,
            tokenCount,
            attachments,
            fullName
        } = req.body;

        console.log(req.body);

        collection.find({ unique_id: { $in: [ otherUser, signedInUser ] } }).toArray((err, users) => {
            if (err) {
                console.log(err);

                resppp.json({
                    err,
                    message: "Critical error occurred..."
                })
            } else {
                
                if (milestone === true) {
                    const promiseee = new Promise((resolve, reject) => {
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            // signed in user - action user
                            if (user.unique_id === signedInUser) {
    
                                console.log("signed in user", user);

                                if (_.has(user, "tokenCurrency") && user.tokenCurrency >= tokenCount) {
                                    const newData = {
                                        id: uuidv4(),
                                        systemDate: Date.now(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        jobID,
                                        attachments,
                                        payByMilestone: true,
                                        milestone1, 
                                        milestone2, 
                                        milestone3: isEmpty(milestone3) ? null : milestone3, 
                                        milestone4: isEmpty(milestone4) ? null : milestone4,  
                                        milestone5: isEmpty(milestone5) ? null : milestone5, 
                                        milestone6: isEmpty(milestone6) ? null : milestone6,  
                                        milestone7: isEmpty(milestone7) ? null : milestone7,  
                                        milestone8: isEmpty(milestone8) ? null : milestone8,
                                        question0, 
                                        question1, 
                                        question2,
                                        question3, 
                                        question4,
                                        duration,
                                        coverLetterText,
                                        hourly: false,
                                        applicant: signedInUser
                                    };
        
                                    if (user.appliedJobsAlready) {
                                        user.appliedJobsAlready.push(newData);
                                    } else {
                                        user["appliedJobsAlready"] = [newData];
                                    }

                                    user.tokenCurrency -= tokenCount;
        
                                    collection.save(user);
        
                                    resolve(user);
                                } else {
                                    resppp.json({
                                        message: "NOT ENOUGH tokens to apply!"
                                    })
                                }
                            }
                        }  
                    })
    
                    promiseee.then((passedData) => {
    
                        console.log("second part ran..........");
    
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            
                            // other user (user that posted the listing)...
                            if (user.unique_id === otherUser) {
                                console.log("other user - poster", user);
    
                                const newData = {
                                    id: uuidv4(),
                                    systemDate: Date.now(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    jobID,
                                    attachments,
                                    milestone1, 
                                    milestone2, 
                                    milestone3: isEmpty(milestone3) ? null : milestone3, 
                                    milestone4: isEmpty(milestone4) ? null : milestone4,  
                                    milestone5: isEmpty(milestone5) ? null : milestone5, 
                                    milestone6: isEmpty(milestone6) ? null : milestone6,  
                                    milestone7: isEmpty(milestone7) ? null : milestone7,  
                                    milestone8: isEmpty(milestone8) ? null : milestone8,  
                                    duration, 
                                    question0, 
                                    question1, 
                                    question2,
                                    question3, 
                                    question4,
                                    coverLetterText,
                                    payByMilestone: true,
                                    hourly: false,
                                    applicant: signedInUser
                                };
    
                                if (user.applicantsForPostedJobs) {
                                    user.applicantsForPostedJobs.push(newData);
                                } else {
                                    user["applicantsForPostedJobs"] = [newData];
                                }
    
                                collection.save(user);

                                jobsCollection.findOne({ unique_id: jobID }).then((job) => {
                                    if (job) {

                                        if (job.applicants) {
                                            job.applicants.push(newData);
                                        } else {
                                            job["applicants"] = [newData];
                                        }

                                        job.proposals += 1;

                                        jobsCollection.save(job);

                                        resppp.json({
                                            message: "Successfully executed logic!"
                                        })
                                    } else {
                                        resppp.json({
                                            message: "could NOT locate job...."
                                        })
                                    }
                                }).catch((criticalErr) => {
                                    console.log(criticalErr);
                                })
                            }
                        }   
                    })
                } else {
                    console.log("fixed price! - no milestone.");

                    const promiseee = new Promise((resolve, reject) => {
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            // signed in user - action user
                            if (user.unique_id === signedInUser) {
    
                                console.log("signed in user", user);

                                if (_.has(user, "tokenCurrency") && user.tokenCurrency >= tokenCount) {
                                    const newData = {
                                        id: uuidv4(),
                                        systemDate: Date.now(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        jobID,
                                        payByMilestone: false,
                                        duration,
                                        attachments,
                                        coverLetterText,
                                        question0, 
                                        question1, 
                                        question2,
                                        question3, 
                                        question4,
                                        ratePerProjectCompletion: Number(myBid),
                                        hourly: false,
                                        applicant: signedInUser
                                    };
        
                                    if (user.appliedJobsAlready) {
                                        user.appliedJobsAlready.push(newData);
                                    } else {
                                        user["appliedJobsAlready"] = [newData];
                                    }

                                    user.tokenCurrency -= tokenCount;
        
                                    collection.save(user);
        
                                    resolve(user);
                                } else {
                                    resppp.json({
                                        message: "NOT ENOUGH tokens to apply!"
                                    })
                                }
                            }
                        }  
                    })
    
                    promiseee.then((passedData) => {
    
                        console.log("second part ran..........");
    
                        for (let index = 0; index < users.length; index++) {
                            const user = users[index];
                            
                            // other user (user that posted the listing)...
                            if (user.unique_id === otherUser) {
                                console.log("other user - poster", user);
    
                                const newData = {
                                    id: uuidv4(),
                                    systemDate: Date.now(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    jobID, 
                                    duration, 
                                    question0, 
                                    question1, 
                                    question2,
                                    question3, 
                                    question4,
                                    attachments,
                                    coverLetterText,
                                    payByMilestone: false,
                                    ratePerProjectCompletion: Number(myBid),
                                    hourly: false,
                                    applicant: signedInUser
                                };
    
                                jobsCollection.findOne({ unique_id: jobID }).then((job) => {
                                    if (job) {

                                        job.proposals += 1;

                                        if (job.applicants) {
                                            job.applicants.push(newData);
                                        } else {
                                            job["applicants"] = [newData];
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
                                                title: `You have a new applicant proposal for a job you posted!`,
                                                body: `${fullName} applied to a job you posted, they are interested in working for you...! Check our their proposal and profile.`,
                                            },
                                            from: signedInUser,
                                            link: "job-applicant"
                                        };
                                        
                                        if (user.applicantsForPostedJobs) {
                                            user.applicantsForPostedJobs.push(newData);
                                        } else {
                                            user["applicantsForPostedJobs"] = [newData];
                                        }

                                        if (user.notifications) {
                                            user.notifications.push(notificationAddition);
                                        } else {
                                            user["notifications"] = [notificationAddition];
                                        }
                                        
                                        collection.save(user);
                        
                                        axios.post("https://fcm.googleapis.com/fcm/send", {
                                            "to": user.firebasePushNotificationToken,
                                            "notification": {
                                                "title": `You have a new applicant proposal for a job you posted!`,
                                                "body": `${fullName} applied to a job you posted, they are interested in working for you...! Check our their proposal and profile.`,
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
                                            
                                            jobsCollection.save(job);


                                            resppp.json({
                                                message: "Successfully executed logic!"
                                            })

                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                    } else {
                                        resppp.json({
                                            message: "could NOT locate job...."
                                        })
                                    }
                                }).catch((criticalErr) => {
                                    console.log(criticalErr);
                                })
                            }
                        }   
                    })
                }
            }
        })
    });
});

module.exports = router;