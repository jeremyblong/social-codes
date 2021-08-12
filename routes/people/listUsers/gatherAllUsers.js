const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({}, { fields : { 
            firstName: 1,
            lastName: 1,
            profilePics: 1,
            birthdate: 1,        
            coverPhotos: 1,
            unique_id: 1
        }}).limit(8).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    err,
                    message: "Could not find users, error occurred."
                })
            } else {
                res.json({
                    message: "Gathered all users!",
                    users
                })
            }
        })
    });
});

module.exports = router;