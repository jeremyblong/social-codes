const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, resppppppp) => {

        const { id } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ "wallPosts.id": id }).then((user) => {
            if (user) {
                console.log(user);

                for (let index = 0; index < user.wallPosts.length; index++) {
                    const post = user.wallPosts[index];
                    
                    if (post.id === id) {
                        resppppppp.json({
                            message: "Found comments!",
                            comments: post.comments
                        })
                    }
                }
            } else {
                resppppppp.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;