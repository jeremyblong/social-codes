const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, resppppp) => {

        const { 
            id,
            overallExperienceAsFreelancer,
            communicationFromEmployerRating,
            meetOrExceedEmployerRating,
            knowledgableFreelancerRating,
            clearLanguageFreelancerRating,
            wouldFreelanceAgainRating,
            colleagueRecommendFreelancerStarSkill,
            adequateFreelancerSkillRating,
            receptiveFreelancerSkillsRating,
            gig,
            otherUser,
            fullName
        } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        const notification = {
            id: uuidv4(),
            system_date: Date.now(),
            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
            data: {
                title: `${fullName} left you a review, check it out!`,
                body: `${fullName} left your a new review, go to you profile to check it out now!`
            },
            from: id,
            link: "reviews"
        };

        collection.findOneAndUpdate({ unique_id: otherUser }, { $push: { reviews: {
            communication: communicationFromEmployerRating,
            overallExperience: overallExperienceAsFreelancer,
            meetOrExceedExpectations: meetOrExceedEmployerRating,
            knowledgeable: knowledgableFreelancerRating,
            spokeProperLanguage: clearLanguageFreelancerRating,
            wouldHireAgain: wouldFreelanceAgainRating,
            wouldRecommend: colleagueRecommendFreelancerStarSkill,
            hadAdequateSkillSets: adequateFreelancerSkillRating,
            wasReceptive: receptiveFreelancerSkillsRating,
            gig,
            leftBy: id
        }, notifications: notification }}).then((success) => {
            if (success) {
                console.log(success);

                const user = success.value;

                collection.findOne({ unique_id: id }).then((userrr) => {
                    if (userrr) {

                        for (let index = 0; index < userrr.completedProjects.length; index++) {
                            const project = userrr.completedProjects[index];
                            
                            if (gig.id === project.id) {

                                project["workerLeftReview"] = true;

                                const configgg = {
                                    headers: {
                                        "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                        "Content-Type": "application/json"
                                    }
                                }
                
                                axios.post("https://fcm.googleapis.com/fcm/send", {
                                    "to": user.firebasePushNotificationToken,
                                    "notification": {
                                        "title": `${fullName} left you a review, check it out!`,
                                        "body": `${fullName} left your a new review, go to you profile to check it out now!`,
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
                                    
                                    collection.save(userrr, (errrrrrr, result) => {
                                        if (errrrrrr) {
                                            resppppp.json({
                                                message: "ERROR Saving!",
                                                errrrrrr
                                            }) 
                                        } else {
                                            resppppp.json({
                                                message: "Left review!",
                                                user
                                            })
                                        }
                                    })
                
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                        }
                    } else {
                        resppppp.json({
                            message: "Could not find secondary user..."
                        })
                    }
                }).catch((errrr) => {
                    console.log(errrr);
                });
            } else {
                resppppp.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;