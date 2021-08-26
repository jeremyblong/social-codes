const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");
// const geodist = require("geodist");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { current_location } = req.body;

        const database = db.db("db");

        const collection = database.collection("jobs");

        collection.createIndex({
            "address.loc": "2dsphere"
        });
        // change $maxDistance (meters) for production
        collection.find({ 
            "address.loc": { $near: { $geometry: { type: "Point" , coordinates: [current_location.coords.longitude, current_location.coords.latitude] }, $maxDistance: 10000000 }}
        }).toArray((err, jobs) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "ERROR occurred...",
                    err
                })
            } else {
                res.json({
                    message: "Gathered jobs by location",
                    jobs
                })
            }
        })
    });
});

module.exports = router;