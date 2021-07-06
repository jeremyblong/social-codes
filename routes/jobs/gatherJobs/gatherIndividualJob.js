const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id } = req.query;

        console.log(id);

        const database = db.db("db");

        const collection = database.collection("jobs");

        collection.findOne({ unique_id: id }).then((job) => {
            if (job) {
                console.log(job);

                res.json({
                    message: "Found job!",
                    job
                })
            } else {
                res.json({
                    message: "Job could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;