const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { searchValue } = req.body;

        const database = db.db("db");

        const collection = database.collection("jobs");

        collection.find({ title: { $regex: `.*${searchValue.toLowerCase()}.*` }}).toArray((err, posts) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "ERROR locating posts!",
                    err
                })
            } else {

                res.json({
                    message: "Narrowed search!",
                    results: posts
                })
            }
        });
    });
});

module.exports = router;