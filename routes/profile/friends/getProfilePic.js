const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                res.json({
                    message: "Located user photo",
                    photo: typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? `${config.get("wasabi_url")}/${user.profilePics[user.profilePics.length - 1].picture}` : _.has(user, "photo") ? user.photo : config.get("no_image_avaliable"),
                    type: typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].type : "picture"
                })
            } else {
                res.json({
                    message: "Could NOT locate photo...",
                    photo: config.get("no_image_avaliable")
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;