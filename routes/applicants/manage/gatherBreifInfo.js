const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { applicantID } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: applicantID }, { fields: { username: 1, unique_id: 1, profilePics: 1, photo: 1, firstName: 1, lastName: 1, accountType: 1 }}).then((user) => {
            if (user) {
                
                res.json({
                    message: "Located data!",
                    user
                })
            } else {
                res.json({
                    message: "Could NOT locate user..."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);

            res.json({
                err,
                message: "Critical error occurred..."
            })
        })
    });
});

module.exports = router;