const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const JobSchema = require("../../../schemas/jobs/postNewJob/index.js");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { jobData, unique_id } = req.body;

        const generatedID = uuidv4();

        const structuredAddressData = {
            ...jobData.address,
            loc: {
                type: "Point", 
                coordinates: [ jobData.address.position.lon, jobData.address.position.lat ] 
            }
        }

        const newJob = new JobSchema({
            category: jobData.category,
            page: jobData.page,
            title: jobData.title,
            description: jobData.description,
            tags: jobData.tags,
            task: jobData.task,
            coverLetterRequired: jobData.coverLetterRequired,
            questionsBeforeApplying: jobData.questionsBeforeApplying,
            typeOfApplicant: jobData.typeOfApplicant,
            typeOfProject: jobData.typeOfProject,
            selectedTags: jobData.selectedTags,
            languagesSelected: jobData.languagesSelected,
            skillLevel: jobData.skillLevel,
            whoCanApply: jobData.whoCanApply,
            multipleFreelancers: jobData.multipleFreelancers,
            multipleOrSingularFreelancersRequired: jobData.multipleOrSingularFreelancersRequired,
            numberOfFreelancersRequired: jobData.numberOfRequiredFreelancers,
            jobSuccessScore: jobData.jobSuccessScore,
            minAmountEarnedToApply: jobData.minAmountEarnedToApply,
            pricing: jobData.pricing,
            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
            system_date: Date.now(),
            unique_id: generatedID,
            poster: unique_id,
            tokensRequiredToApply: jobData.tokensRequiredToApply,
            proposals: 0,
            address: structuredAddressData
        });

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id }).then((user) => {
            if (user) {

                if (user.activeJobs) {
                    user.activeJobs.push(generatedID);
                } else {
                    user["activeJobs"] = [generatedID];
                }

                collection.save(user);
                
                newJob.save((err, data) => {
                    if (err) {
                        console.log(err);
        
                        res.json({
                            err,
                            message: "Critical error occurred..."
                        })
                    } else {
                        res.json({
                            message: "Successfully posted job!",
                            user: data
                        })
                    }
                })
            } else {
                res.json({
                    message: "User does NOT exist!"
                })
            }
        }).catch((err) => {
            console.log(err);
        })

    });
});

module.exports = router;