const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }, { fields: { profilePics: 1, photo: 1 }}).then((user) => {
            if (user) {
                console.log(user);

                res.json({
                    message: "Located the desired user!",
                    photo: typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? `${config.get("wasabi_url")}/${user.profilePics[user.profilePics.length - 1].picture}` : _.has(user, "photo") ? user.photo : config.get("no_image_avaliable"),
                    type: typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].type : "picture"
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