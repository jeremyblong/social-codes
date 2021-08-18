const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, bio } = req.body;

        console.log(req.body);

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOneAndUpdate({ unique_id: id }, { $set: { bio }}, (err, result) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Error occurred!",
                    err
                })
            } else {
                res.json({
                    message: "Updated bio!",
                    bio
                })
            }
        });
    });
});

module.exports = router;