const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, res) => {

        const { guid, group, id } = req.body;

        console.log(req.body)

        const database = db.db("db");

        const collection = database.collection("users");

        const combined = [];

        for (let index = 0; index < group.length; index++) {
            const user = group[index];
            combined.push(user.uid);
        }

        collection.updateMany({ unique_id: { $in: [ ...combined ]}}, { $pull: { "groupConversations": { "guid": guid }}}, (err, result) => {
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