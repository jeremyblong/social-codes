const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { username } = req.query;

        const lowerUsername = username.toLowerCase();

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ username: lowerUsername }).then((user) => {
            if (user) {
                console.log(user);

                res.json({
                    message: "Username has ALREADY been taken!"
                })
            } else {
                res.json({
                    message: "Username has not been taken!"
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;