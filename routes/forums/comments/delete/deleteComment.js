const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, resp) => {

        const { id, comment, forummm } = req.body;

        const database = db.db("db");

        const collection = database.collection("forums");

        collection.findOne({ id: forummm.id }).then((forum) => {
            if (forum) {
                
                for (let index = 0; index < forum.comments.length; index++) {
                    const commenttt = forum.comments[index];
                    
                    if (commenttt.id === comment.id) {

                        forum.comments.splice(index, 1);

                        collection.save(forum);

                        resp.json({
                            message: "Successfully deleted comment!",
                            comment: commenttt
                        })
                    }
                }
            } else {
                resp.json({
                    message: "Forum post could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;