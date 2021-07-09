const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id, jobID, applicant } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                if (typeof user.applicantsForPostedJobs != "undefined" && user.applicantsForPostedJobs.length > 0) {
                    for (let index = 0; index < user.applicantsForPostedJobs.length; index++) {
                        const job = user.applicantsForPostedJobs[index];
                        // matching applicant proposal submitted by original user
                        if (job.jobID === jobID && applicant === job.applicant) {
                            res.json({
                                message: "Located specific job!",
                                job
                            })
                        }
                    }
                } else {
                    res.json({
                        message: "Located specific job!",
                        job: null
                    })
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