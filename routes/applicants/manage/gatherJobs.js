const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id } = req.body;

        const database = db.db("db");

        const collection = database.collection("jobs");

        collection.find({ poster: id }).toArray((err, jobs) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Could NOT locate any jobs...",
                    err
                })
            } else {

                res.json({
                    message: "Located jobs!",
                    jobs
                })
            }
        })
    });
});

module.exports = router;