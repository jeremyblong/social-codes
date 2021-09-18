const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");
const axios = require("axios");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, respppppp) => {

        const { id, membersIDS, conversation } = req.body;

        console.log(req.body);

        const database = db.db("db");

        const collection = database.collection("users");

        const includeSelf = [...membersIDS, id];

        collection.updateMany({ unique_id: { $in: includeSelf }}, { $push: { "groupConversations": conversation }}, (err, result) => {
            if (err) {
                console.log(err);

                respppppp.json({
                    message: "ERROR!",
                    err
                })
            } else {
                console.log("success...");

                respppppp.json({
                    message: "Added members!"
                })
            }
        });
    });
});

module.exports = router;