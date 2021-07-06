const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { applicant } = req.body;

        const database = db.db("db");

        const collection = database.collection("jobs");

        collection.findOne({ unique_id: applicant.jobID }).then((job) => {
            for (let i = 0; i < job.applicants.length; i++) {

                const applicant = job.applicants[i];

                if (applicant.id === applicant.id) {

                    job.applicants.splice(i, 1);

                    collection.save(job);

                    res.json({
                        message: "Removed applicant"
                    })
                }
            }
        }).catch((err) => {
            console.log(err);

            res.json({
                message: "Could NOT locate job...",
                err
            })
        })
    });
});

module.exports = router;