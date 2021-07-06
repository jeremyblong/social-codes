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
    router.post("/", (req, res) => {

        const { id, selected, job } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");
        const jobCollection = database.collection("jobs");

        collection.find({ unique_id: { $in: [selected.applicant, id ] }}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "An error occurred while attempting to delete applicant...",
                    err
                })
            } else {
                
                jobCollection.findOne({ "applicants.id": selected.id }).then((jobbb) => {
                    if (jobbb) {
                        console.log("JOBBB", jobbb);
                        const promiseee = new Promise((resolve, reject) => {
                            for (let iii = 0; iii < users.length; iii++) {
                                const user = users[iii];
                                
                                if (user.unique_id === id) {
                                    // signed in user
                                    if (typeof user.applicantsForPostedJobs !== "undefined" && user.applicantsForPostedJobs.length > 0) {
                                        for (let index = 0; index < user.applicantsForPostedJobs.length; index++) {
                                            const applicant = user.applicantsForPostedJobs[index];
                                            if (applicant.id === selected.id) {
                                                console.log("MATCH!.....:", applicant);
                
                                                user.applicantsForPostedJobs.splice(index, 1);

                                                if (typeof jobbb.applicants !== "undefined" && jobbb.applicants.length > 0) {
                                                    console.log("first main statement ran...");
                                                    for (let index = 0; index < jobbb.applicants.length; index++) {
                                                        const applicant = jobbb.applicants[index];
                                                        if (applicant.id === selected.id) {
                            
                                                            jobbb.applicants.splice(index, 1);
                                                            
                                                            jobCollection.save(jobbb);

                                                            collection.save(user);

                                                            resolve(jobbb.applicants);
                                                        }
                                                    }
                                                } else {
                                                    console.log("inner else ran.");

                                                    collection.save(user);

                                                    resolve([]);
                                                }
                                            }
                                        }
                                    } else {
                                        if (typeof jobbb.applicants !== "undefined" && jobbb.applicants.length > 0) {
                                            console.log("second main statement ran...");
                                            for (let index = 0; index < jobbb.applicants.length; index++) {
                                                const applicant = jobbb.applicants[index];
                                                if (applicant.id === selected.id) {
                    
                                                    jobbb.applicants.splice(index, 1);
                                                    
                                                    jobCollection.save(jobbb);

                                                    collection.save(user);

                                                    resolve(jobbb.applicants);
                                                }
                                            }
                                        } else {
                                            console.log("second inner else ran.");

                                            collection.save(user);

                                            resolve([]);
                                        }
                                    }
                                }
                            }
                        })
        
                        promiseee.then((passedValues) => {
                            for (let iii = 0; iii < users.length; iii++) {
                                const user = users[iii];
                                // applicant - other user
                                if (user.unique_id === selected.applicant) {
        
                                    const notificationAddition = {
                                        id: uuidv4(),
                                        system_date: Date.now(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        data: {
                                            title: `You were NOT selected for the job with the ID of ${selected.id}...`,
                                            body: `You weren't selected for a job you applied to titled '${job.title}', Keep trying and apply to more jobs for a higher liklihood of success!`,
                                        },
                                        from: id,
                                        link: "job", 
                                        job
                                    };
        
                                    if (user.notifications) {
                                        user.notifications.push(notificationAddition);
                                    } else {
                                        user["notifications"] = [notificationAddition];
                                    }
        
                                    collection.save(user);

                                    const secondaryPromises = [];

                                    for (let index = 0; index < passedValues.length; index++) {
                                        const applicant = passedValues[index];
                                        
                                        secondaryPromises.push(new Promise((resolve, reject) => {
                                            axios.get(`${config.get("ngrok_url")}/gather/breif/info/applicant`, {
                                                params: {
                                                    applicantID: applicant.applicant
                                                }
                                            }).then((response) => {
                                                if (response.data.message === "Located data!") {
                        
                                                    const { user } = response.data;
                        
                                                    applicant.firstName = user.firstName;
                                                    applicant.lastName = user.lastName;
                                                    applicant.accountType = user.accountType;
                                                    applicant.username = user.username;
                                                    applicant.profilePic = _.has(user, "profilePics") ? `${config.get("wasabi_url")}/${user.profilePics[user.profilePics.length - 1].picture}` : _.has(user, "photo") ? user.photo : config.get("no_image_avaliable"),
                                                    applicant.profilePicType = _.has(user, "profilePics") ? user.profilePics[user.profilePics.length - 1].type : "picture";
                        
                                                    resolve(applicant);
                                                } else {
                                                    reject(null);
                                                }
                                            }).catch((errrrrr) => {
                                                console.log(errrrrr);
                        
                                                reject(errrrrr);
                                            })
                                        }))
                                    }
                        
                                    Promise.all(secondaryPromises).then((secondaryValues) => {
                                        res.json({
                                            message: "Deleted applicant!",
                                            applicants: secondaryValues
                                        })
                                    })
                                }
                            }
                        })
                    } else {
                        res.json({
                            message: "Could not locate the desired job..."
                        })
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        })
    });
});

module.exports = router;