const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", async (req, resp) => {

        const { 
            experienceLevel,
            jobType,
            numberOfProposals,
            clientPayment,
            budget,
            projectLengthOfTime, 
            hoursPerWeek 
        } = req.query;

        const matchedJobs = [];
        const alreadyAddedUsers = [];

        const database = db.db("db");

        console.log("req.query", req.query);

        const collection = database.collection("jobs");

        if (typeof experienceLevel !== "undefined" && experienceLevel.length > 0) {
            await collection.find({ skillLevel: { $in: experienceLevel }}).forEach((job) => {

                matchedJobs.push(job);
    
                alreadyAddedUsers.push(job.unique_id);
            })
        }
        if (typeof jobType !== "undefined" && jobType.length > 0) {
            await collection.find({ "pricing.rate": { $in: jobType }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
                console.log("job", job);

                matchedJobs.push(job);

                alreadyAddedUsers.push(job.unique_id);
            })
        }
        if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("less-than-5")) {
            await collection.find({ "proposals": { $lte: 5 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
                console.log("job", job);
    
                matchedJobs.push(job);

                alreadyAddedUsers.push(job.unique_id);
            })
        }

        if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("10-15")) {
            await collection.find({ "proposals": { $gte: 10, $lte: 15 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
                console.log("job", job);
    
                matchedJobs.push(job);

                alreadyAddedUsers.push(job.unique_id);
            })
        }

        if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("5-10")) {
            await collection.find({ "proposals": { $gte: 5, $lte: 10 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
                console.log("job", job);
    
                matchedJobs.push(job);

                alreadyAddedUsers.push(job.unique_id);
            })
        }
        if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("15-20")) {
            await collection.find({ "proposals": { $gte: 15, $lte: 20 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
                console.log("job", job);
    
                matchedJobs.push(job);

                alreadyAddedUsers.push(job.unique_id);
            })
        }

        if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("20-50")) {
            await collection.find({ "proposals": { $gte: 20, $lte: 50 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
                console.log("job", job);
    
                matchedJobs.push(job);

                alreadyAddedUsers.push(job.unique_id);
            })
        }

        resp.json({
            message: "Successfully located queried jobs!",
            result: matchedJobs
        })
    });
});

module.exports = router;