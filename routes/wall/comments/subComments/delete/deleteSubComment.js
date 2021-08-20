const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, resppppppp) => {

        const { id, subComment, comment, postID } = req.body;

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
                            // loop through sub comments
                            if (typeof element.subComments !== "undefined" && element.subComments.length > 0) {
                                for (let xxx = 0; xxx < element.subComments.length; xxx++) {
                                    const sub = element.subComments[xxx];
                                    // find matching sub comment
                                    if (sub.id === subComment.id) {
                                        element.subComments.splice(xxx, 1);

                                        collection.save(user, (err, result) => {
                                            if (err) {
                                                console.log(err);

                                                resppppppp.json({
                                                    message: "Error occurred while saving...",
                                                    err
                                                })
                                            } else {
                                                resppppppp.json({
                                                    message: "Deleted sub-comment!"
                                                })
                                            }
                                        })
                                    }
                                }
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