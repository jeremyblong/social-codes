const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, res) => {

        const { 
            otherID,
            GUID 
        } = req.body;

        console.log(req.body);

        const database = db.db("db");

        const collection = database.collection("users");

        collection.updateOne({ unique_id: otherID }, { $pull: { "groupConversations": { "guid": GUID }}}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("result", result);

                res.json({
                    message: "Banned!"
                })
            }
        });
    });
});

module.exports = router;