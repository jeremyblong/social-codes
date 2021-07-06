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

        const { portfolio, id } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                const newData = {
                    ...portfolio,
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    systemDate: Date.now(),
                    id: uuidv4()
                };

                if (user.portfolioProjects) {
                    user.portfolioProjects.push(newData);
                } else {
                    user["portfolioProjects"] = [newData];
                }

                collection.save(user);

                res.json({
                    message: "Uploaded portfolio project!"
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