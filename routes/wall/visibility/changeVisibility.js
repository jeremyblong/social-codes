const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, visibility } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOneAndUpdate({ unique_id: id }, { $set: { wallPostVisibility: visibility }}).then((user) => {
            if (user) {

                res.json({
                    message: "Updated visibility!"
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