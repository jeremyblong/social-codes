const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { like, id, forum } = req.body;

        const database = db.db("db");

        const collection = database.collection("forums");

        collection.findOne({ id: forum.id }).then((forum) => {
            if (forum) {

                const alreadyExists = forum.emojiResponses.indexOf({
                    id,
                    like
                });

                if (alreadyExists === -1) {
                    forum.reactions[like] += 1;
                } else {
                    forum.reactions[like] -= 1;
                }

                if (alreadyExists === -1) {
                    forum.emojiResponses.push({
                        like,
                        id
                    })
                } else {
                    forum.emojiResponses.splice(alreadyExists, 1);
                }
                

                console.log("forum", forum);

                collection.save(forum);

                res.json({
                    message: "Located and responded with emoji to forum posting!",
                    forummm: forum
                })
            } else {
                res.json({
                    message: "Forum post could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;