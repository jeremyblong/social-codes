const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, resppppppp) => {

        const { id, comment, postID } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ "wallPosts.id": postID }).then((user) => {
            if (user) {
                // loop through wall posts
                for (let index = 0; index < user.wallPosts.length; index++) {
                    const post = user.wallPosts[index];
                    // loop through comments
                    if (typeof post.comments !== "undefined" && post.comments.length > 0) {
                        for (let iiii = 0; iiii < post.comments.length; iiii++) {
                            const element = post.comments[iiii];
                            if (element.id === comment.id) {
                                post.comments.splice(iiii, 1);

                                collection.save(user, (err, result) => {
                                    if (err) {
                                        console.log(err);

                                        resppppppp.json({
                                            message: "Error occurred while saving...",
                                            err
                                        })
                                    } else {
                                        resppppppp.json({
                                            message: "Deleted main-comment!"
                                        })
                                    }
                                })
                            }
                        }
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