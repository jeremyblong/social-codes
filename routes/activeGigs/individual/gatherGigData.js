const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id, gigData } = req.query;

        console.log(req.query);

        const jobData = JSON.parse(gigData);

        const database = db.db("db");

        const collection = database.collection("jobs");

        collection.findOne({ unique_id: jobData.jobID }).then((job) => {
            if (job) {
                console.log(job);

                for (let index = 0; index < job.applicants.length; index++) {
                    const applicant = job.applicants[index];
                    
                    if (applicant.applicant === id) {
                        res.json({
                            message: "Located the desired job!",
                            job,
                            applicant
                        })                        
                    }
                }
            } else {
                res.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;