const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { unique_id, token } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id }).then((user) => {
            if (user) {
                console.log(user);

                if (user.firebasePushNotificationToken) {
                    user.firebasePushNotificationToken = token;
                } else {
                    user["firebasePushNotificationToken"] = token;
                }

                collection.save(user);

                res.json({
                    message: "Saved firebase token!",
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