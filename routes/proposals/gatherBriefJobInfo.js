const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const request = require('request');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { jobID } = req.query;

        const database = db.db("db");

        const collection = database.collection("jobs");

        collection.findOne({ unique_id: jobID }).then((job) => {
            if (job) {
                console.log(job);

                res.json({
                    message: "Successfully located listing!",
                    job
                })
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