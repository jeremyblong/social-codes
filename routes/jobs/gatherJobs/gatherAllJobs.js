const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("db");

        const { alreadyPooled } = req.body;

        const collection = database.collection("jobs");

        console.log(req.body);

        collection.aggregate(
            [
                { "$match": { "unique_id": { "$nin": alreadyPooled }}},
                { "$sample": { size: 5 } } 
            ]
        ).limit(5).toArray((err, jobs) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Critical error while gathering jobs!",
                    err
                })
            } else {

                res.json({
                    message: "Successfully located jobs!",
                    jobs
                })
            }
        });
    });
});

module.exports = router;