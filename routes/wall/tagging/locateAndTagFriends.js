const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("db");

        const { id } = req.query;

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }, { acceptedFriendRequests: true }).then((user) => {
            if (user) {

                console.log("USER FRIENDS FOUND", user);

                res.json({
                    message: "Located friends to tag!",
                    user,
                    friends: typeof user.acceptedFriendRequests !== "undefined" && user.acceptedFriendRequests.length > 0 ? user.acceptedFriendRequests : []
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