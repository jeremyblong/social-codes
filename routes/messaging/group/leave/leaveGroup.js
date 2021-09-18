const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, res) => {

        const { guid, id } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.updateOne({ unique_id: id }, { $pull: { "groupConversations": { "guid": guid }}}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("result", result);

                res.json({
                    message: "Deleted conversation!"
                })
            }
        });
    });
});

module.exports = router;