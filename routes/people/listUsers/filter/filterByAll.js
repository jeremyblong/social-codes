const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", async (req, resp) => {

        const { 
            allTags,
            id,
            ageRangeArray,
            accountTypeArray,
            minAmountEarnedArray,
            jobsCompletedArray,
            alreadyPooled
        } = req.body;

        const matchedUsers = [];
        const alreadyAddedUsers = [];

        const database = db.db("db");

        const now = new Date().getFullYear();
        const finalUserArray = [];

        const collection = database.collection("users");

        if (typeof ageRangeArray !== "undefined" && ageRangeArray.length > 0) {

            for (let index = 0; index < ageRangeArray.length; index++) {
                const ageRange = ageRangeArray[index];

                let start, end;
                switch (ageRange) {
                    case "18-25":
                        console.log("1");

                        start = (now - 18);
                        end = (now - 25);

                        await collection.find({ birthdate: { $gte: new Date(`${end}-01-01`), $lt: new Date(`${start}-01-01`) }, unique_id: { $nin: alreadyPooled }}, { fields: {
                            firstName: 1,
                            lastName: 1,
                            profilePics: 1,
                            birthdate: 1,        
                            coverPhotos: 1,
                            unique_id: 1,
                            accountType: 1
                        }}).forEach((user) => {

                            matchedUsers.push(user);

                            finalUserArray.push(user.unique_id);
                
                            alreadyAddedUsers.push(user.unique_id);
                        })
                        break;
                    case "26-35":
                        console.log("2");
                        
                        start = (now - 26);
                        end = (now - 35);
                        
                        await collection.find({ birthdate: { $gte: new Date(`${end}-01-01`), $lt: new Date(`${start}-01-01`) }, unique_id: { $nin: alreadyPooled }}, { fields: {
                            firstName: 1,
                            lastName: 1,
                            profilePics: 1,
                            birthdate: 1,        
                            coverPhotos: 1,
                            unique_id: 1,
                            accountType: 1
                        }}).forEach((user) => {

                            matchedUsers.push(user);

                            finalUserArray.push(user.unique_id);
                
                            alreadyAddedUsers.push(user.unique_id);
                        })
                        break;
                    case "36-45":
                        console.log("3");
                        
                        start = (now - 36);
                        end = (now - 45);
                        
                        await collection.find({ birthdate: { $gte: new Date(`${end}-01-01`), $lt: new Date(`${start}-01-01`) }, unique_id: { $nin: alreadyPooled }}, { fields: {
                            firstName: 1,
                            lastName: 1,
                            profilePics: 1,
                            birthdate: 1,        
                            coverPhotos: 1,
                            unique_id: 1,
                            accountType: 1
                        }}).forEach((user) => {

                            matchedUsers.push(user);

                            finalUserArray.push(user.unique_id);
                
                            alreadyAddedUsers.push(user.unique_id);
                        })
                        break;
                    case "46-55":
                        console.log("4");
                        
                        start = (now - 46);
                        end = (now - 55);
                        
                        await collection.find({ birthdate: { $gte: new Date(`${end}-01-01`), $lt: new Date(`${start}-01-01`) }, unique_id: { $nin: alreadyPooled }}, { fields: {
                            firstName: 1,
                            lastName: 1,
                            profilePics: 1,
                            birthdate: 1,        
                            coverPhotos: 1,
                            unique_id: 1,
                            accountType: 1
                        }}).forEach((user) => {

                            matchedUsers.push(user);

                            finalUserArray.push(user.unique_id);
                
                            alreadyAddedUsers.push(user.unique_id);
                        })
                        break;
                    case "56+":
                        console.log("5");
                        
                        start = (now - 56);
                        end = (now - 200);
                        
                        await collection.find({ birthdate: { $gte: new Date(`${end}-01-01`), $lt: new Date(`${start}-01-01`) }, unique_id: { $nin: alreadyPooled }}, { fields: {
                            firstName: 1,
                            lastName: 1,
                            profilePics: 1,
                            birthdate: 1,        
                            coverPhotos: 1,
                            unique_id: 1,
                            accountType: 1
                        }}).forEach((user) => {

                            matchedUsers.push(user);

                            finalUserArray.push(user.unique_id);
                
                            alreadyAddedUsers.push(user.unique_id);
                        })
                        break;
                    default: 
                        return;
                }
            }
        }
        if (typeof accountTypeArray !== "undefined" && accountTypeArray.length > 0) {

            for (let index = 0; index < accountTypeArray.length; index++) {
                const accountType = accountTypeArray[index];

                switch (accountType) {
                    case "work":

                        await collection.find({ accountType, unique_id: { $nin: alreadyPooled }}, { fields: {
                            firstName: 1,
                            lastName: 1,
                            profilePics: 1,
                            birthdate: 1,        
                            coverPhotos: 1,
                            unique_id: 1,
                            accountType: 1
                        }}).forEach((user) => {

                            matchedUsers.push(user);

                            finalUserArray.push(user.unique_id);
                
                            alreadyAddedUsers.push(user.unique_id);
                        })
                        break;
                    case "hire":
                        
                        await collection.find({ accountType, unique_id: { $nin: alreadyPooled }}, { fields: {
                            firstName: 1,
                            lastName: 1,
                            profilePics: 1,
                            birthdate: 1,        
                            coverPhotos: 1,
                            unique_id: 1,
                            accountType: 1
                        }}).forEach((user) => {

                            matchedUsers.push(user);

                            finalUserArray.push(user.unique_id);
                
                            alreadyAddedUsers.push(user.unique_id);
                        })
                        break;
                    default: 
                        return;
                }
            }
        }
        if (typeof minAmountEarnedArray !== "undefined" && minAmountEarnedArray.length > 0) {

            for (let index = 0; index < minAmountEarnedArray.length; index++) {
                const amount = minAmountEarnedArray[index];
                
                await collection.find({ amountEarnedTotal: { $lte: amount }, unique_id: { $nin: alreadyPooled }}, { fields: {
                    firstName: 1,
                    lastName: 1,
                    profilePics: 1,
                    birthdate: 1,        
                    coverPhotos: 1,
                    unique_id: 1,
                    accountType: 1
                }}).forEach((user) => {

                    matchedUsers.push(user);

                    finalUserArray.push(user.unique_id);
        
                    alreadyAddedUsers.push(user.unique_id);
                })
            }
        }
        if (typeof jobsCompletedArray !== "undefined" && jobsCompletedArray.length > 0) {

            for (let index = 0; index < jobsCompletedArray.length; index++) {
                const completed = jobsCompletedArray[index];

                const first = completed.split("-")[0];
                const last = completed.split("-")[1];

                // await collection.find({ amountEarnedTotal: { $lte: amount }, unique_id: { $nin: alreadyPooled }}, { fields: {
                //     firstName: 1,
                //     lastName: 1,
                //     profilePics: 1,
                //     birthdate: 1,        
                //     coverPhotos: 1,
                //     unique_id: 1,
                //     accountType: 1
                // }}).forEach((user) => {

                //     matchedUsers.push(user);

                //     finalUserArray.push(user.unique_id);
        
                //     alreadyAddedUsers.push(user.unique_id);
                // })
            }
        }

        resp.json({
            message: "Successfully located queried jobs!",
            result: matchedUsers,
            alreadyPooled: finalUserArray
        })


        console.log("alreadyAddedUsers", alreadyAddedUsers);
        // if (typeof jobType !== "undefined" && jobType.length > 0) {
        //     await collection.find({ "pricing.rate": { $in: jobType }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
        //         console.log("job", job);

        //         matchedUsers.push(job);

        //         alreadyAddedUsers.push(job.unique_id);
        //     })
        // }
        // if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("less-than-5")) {
        //     await collection.find({ "proposals": { $lte: 5 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
        //         console.log("job", job);
    
        //         matchedUsers.push(job);

        //         alreadyAddedUsers.push(job.unique_id);
        //     })
        // }

        // if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("10-15")) {
        //     await collection.find({ "proposals": { $gte: 10, $lte: 15 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
        //         console.log("job", job);
    
        //         matchedUsers.push(job);

        //         alreadyAddedUsers.push(job.unique_id);
        //     })
        // }

        // if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("5-10")) {
        //     await collection.find({ "proposals": { $gte: 5, $lte: 10 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
        //         console.log("job", job);
    
        //         matchedUsers.push(job);

        //         alreadyAddedUsers.push(job.unique_id);
        //     })
        // }
        // if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("15-20")) {
        //     await collection.find({ "proposals": { $gte: 15, $lte: 20 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
        //         console.log("job", job);
    
        //         matchedUsers.push(job);

        //         alreadyAddedUsers.push(job.unique_id);
        //     })
        // }

        // if (typeof numberOfProposals !== "undefined" && numberOfProposals.length > 0 && numberOfProposals.includes("20-50")) {
        //     await collection.find({ "proposals": { $gte: 20, $lte: 50 }, unique_id: { $nin: alreadyAddedUsers }}).forEach((job) => {
        //         console.log("job", job);
    
        //         matchedUsers.push(job);

        //         alreadyAddedUsers.push(job.unique_id);
        //     })
        // }
    });
});

module.exports = router;