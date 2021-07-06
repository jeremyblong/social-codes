const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { unique_id, skills } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOneAndUpdate({ unique_id }, { $set: { skills }}).then((user) => {
            if (user) {
                console.log(user);

                res.json({
                    message: "Uploaded tags!",
                    user
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