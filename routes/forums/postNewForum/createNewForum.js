const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const Forum = require('../../../schemas/forums/createForumPost.js');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, resp) => {

        const { 
            id, 
            description, 
            title, 
            snippetArray, 
            tags 
        } = req.body;

        
        const newForum = new Forum({
            id: uuidv4(),
            description,
            title,
            snippets: snippetArray,
            tags,
            systemDate: Date.now(),
            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
            poster: id,
            responses: [],
            reactions: {
                screaming: 0,
                exploding: 0,
                tearsOfJoy: 0,
                clapping: 0,
                angry: 0,
                heart: 0,
                wow: 0
            },
            views: 0,
            likes: 0,
            dislikes: 0,
            emojiResponses: [],
            comments: []
        });

        newForum.save((err, data) => {
            if (err) {
                console.log(err);

                resp.json({
                    err,
                    message: "Critical error occurred while saving..."
                })
            } else {
                console.log(data);

                resp.json({
                    message: "Posted new forum post and updated DB!",
                    data
                })
            }
        })
    });
});

module.exports = router;