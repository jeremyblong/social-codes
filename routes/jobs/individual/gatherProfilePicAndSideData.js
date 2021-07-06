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

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }, {$or: [{ profilePics: true }, { photo: true }]}).then((user) => {
            if (user) {

                res.json({
                    message: "Gathered profile picture!",
                    profilePics: user.profilePics || user.photo,
                    googlePhoto: typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? false : true
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