const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { userId } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: userId }, { fields: { profilePics: 1, firstName: 1, lastName: 1, photo: 1, birthdate: 1, username: 1, accountType: 1, unique_id: 1 }}).then((user) => {
            if (user) {
                console.log(user);

                res.json({
                    message: "Located the desired user!",
                    user
                })
            } else {
                res.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);

            res.json({
                err,
                message: "An error occurred..."
            })
        })
    });
});

module.exports = router;