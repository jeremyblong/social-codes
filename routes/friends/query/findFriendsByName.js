const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { query } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.aggregate([
            { $project: { "name" : { $concat : [ "$firstName", " ", "$lastName" ] }, username: 1, firstName: 1, lastName: 1, unique_id: 1, birthdate: 1, accountType: 1 }},
            { $match: { "name": { $regex: query.toLowerCase() }}}
        ]).limit(20).toArray((err, users) => {
            if (users) {
                console.log("users", users);

                res.json({
                    friends: users,
                    message: "Gathered matches!"
                })
            } else {
                console.log(err);

                res.json({
                    err
                })
            }
        });
    });
});

module.exports = router;