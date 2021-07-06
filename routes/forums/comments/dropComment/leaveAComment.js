const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, description, snippets, forum } = req.body;

        const database = db.db("db");

        const collection = database.collection("forums");

        collection.findOne({ id: forum.id }).then((forummm) => {
            if (forummm) {

                const newComment = {
                    id: uuidv4(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    systemDate: Date.now(),
                    description,
                    snippets,
                    posterID: id,
                    likes: 0,
                    dislikes: 0,
                    responses: []
                };

                forummm.comments.push(newComment);

                collection.save(forummm);

                res.json({
                    message: "Successfully updated comments and added new one!",
                    forummm,
                    comment: newComment
                });
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