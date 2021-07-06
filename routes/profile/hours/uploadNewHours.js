const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {
 
        const database = db.db("db");

        const collection = database.collection("users");

        const { id, schedule } = req.body;

        console.log(req.body);

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.hoursAvaliable) {
                    user.hoursAvaliable = schedule;
                } else {
                    user["hoursAvaliable"] = schedule;
                }

                collection.save(user);

                res.json({
                    message: "Uploaded hours!"
                })
            } else {
                res.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;