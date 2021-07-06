const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", async (req, res) => {

        const { interview } = req.body;

        console.log(req.body);

        const database = db.db("db");

        const jobs = database.collection("jobs");

        const item = await jobs.findOne({ unique_id: interview.jobID, multipleFreelancers: false });

        if (item === null) {
            // multiple freelancers required

            jobs.findOne({ unique_id: interview.jobID }).then((job) => {
                if (job) {

                    job.numberOfFreelancersRequired -= 1;

                    jobs.save(job);
    
                    res.json({
                        message: "Deleted job!"
                    })
                } else {
                    res.json({
                        message: "Could NOT locate job..."
                    })
                }
            }).catch((err) => {
                console.log("ERR:", err);
    
                res.json({
                    err,
                    message: "Critical error occurred..."
                })
            })
        } else {
            // one freelancer required
            jobs.remove({ unique_id: item.unique_id }).then((resp) => {
                res.json({
                    message: "Deleted job!"
                })
            });
        }
    });
});

module.exports = router;