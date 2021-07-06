const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { username } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ username }, { fields: { unique_id: 1 }}).then((user) => {
            if (user) {

                res.json({
                    message: "Found user unique id!",
                    unique_id: user.unique_id
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