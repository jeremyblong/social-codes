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

        collection.findOne({ unique_id: id }, { fields: { username: 1, unique_id: 1, profilePics: 1, photo: 1, firstName: 1, lastName: 1 }}).then((user) => {
            if (user) {
                
                res.json({
                    message: "Located data!",
                    photo: typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? `${config.get("wasabi_url")}/${user.profilePics[user.profilePics.length - 1].picture}` : _.has(user, "photo") ? user.photo : config.get("no_image_avaliable"),
                    type: typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].type : "picture",
                    name: `${user.firstName} ${user.lastName}`
                })
            } else {
                res.json({
                    message: "Could NOT locate user..."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);

            res.json({
                err,
                message: "Critical error occurred..."
            })
        })
    });
});

module.exports = router;