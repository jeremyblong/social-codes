const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { userId, otherUserID } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [ userId, otherUserID ]}}, { fields: { profilePics: 1, firstName: 1, lastName: 1, photo: 1, birthdate: 1, username: 1, accountType: 1, unique_id: 1 }}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "User could NOT be found.",
                    err
                })
            } else {

                const selected = {
                    original: null,
                    shared: null
                };

                for (let index = 0; index < users.length; index++) {
                    const user = users[index];
                    // original posting user
                    if (user.unique_id === userId) {
                        selected.original = user;
                    } 
                    // shared by this user
                    if (user.unique_id === otherUserID) {
                        selected.shared = user;
                    }
                }
                
                res.json({
                    message: "Gathered the specified users.",
                    selected
                })
            }
        })
    });
});

module.exports = router;