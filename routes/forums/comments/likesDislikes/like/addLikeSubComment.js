const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, resp) => {

        const { forum, id, commentID } = req.body;

        const database = db.db("db");

        const collection = database.collection("forums");

        collection.findOne({ id: forum.id }).then((forum) => {
            if (forum) {

                for (let index = 0; index < forum.comments.length; index++) {
                    const comment = forum.comments[index];
                    
                    if (comment.id === commentID) {

                        const filtered = comment.responses.filter((item) => {
                            if (item.id === id) {
                                return item;
                            }
                        })
                        
                        const selected = filtered[0];

                        if (comment.responses.includes(selected)) {
                            if (selected.response === "upvote") {
                                comment.likes -= 1;    
                            } else {
                                comment.dislikes -= 1;
                            }
                        } else {
                            comment.likes += 1;
                        }
        
                        if (comment.responses.includes(selected)) {
                            const index = comment.responses.indexOf(selected);
        
                            comment.responses.splice(index, 1);
                        } else {
                            comment.responses.push({
                                id,
                                response: "upvote"
                            });
                        }

                        axios.get(`${config.get("ngrok_url")}/gather/more/basic/info`, {
                            params: {
                                userID: comment.posterID
                            }
                        }).then((res) => {
                            if (res.data.message === "Located the desired user!") {
                                console.log(res.data);
        
                                const { user } = res.data;
        
                                comment.profilePics = user.profilePics;
                                comment.firstName = user.firstName;
                                comment.lastName = user.lastName;
                                comment.accountType = user.accountType;
                                comment.username = user.username;
                                comment.birthdate = user.birthdate;

                                collection.save(forum);
        
                                resp.json({
                                    message: "Upvoted comment!",
                                    comment
                                })
                            } else {
                                console.log("err", res.data);
                            }
                        }).catch((err) => {
                            console.log(err);
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