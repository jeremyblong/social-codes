const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, resppppp) => {

        const { accountType } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.aggregate([{
            $match: {
                accountType
            },
        }, {
            $sample: { size: 100 }
        }]).toArray((err, users) => {
            if (err) {
                console.log(err);

                resppppp.json({
                    message: "Error locating users...",
                    err
                })
            } else {
                resppppp.json({
                    message: "Successfully located specific users!",
                    users
                })
            }
        })
    });
});

module.exports = router;