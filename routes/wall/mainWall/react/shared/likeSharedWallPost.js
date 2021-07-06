const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const axios = require("axios");
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, resppppppp) => {

        const { id, post, like } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ "wallPosts.newData.id": post.newData.id }).then((userrrrrrr) => {
            if (userrrrrrr) {

                for (let index = 0; index < userrrrrrr.wallPosts.length; index++) {
                    const wallPost = userrrrrrr.wallPosts[index];
                    // if post matches the post reacted to
                    if (_.has(wallPost, "newData")) {
                        if (wallPost.newData.id === post.newData.id) {

                            const { reactions, peopleReacted, peopleReactedIDs } = wallPost.newData;
    
                            const newPerson = {
                                id: uuidv4(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                systemDate: Date.now(),
                                reactingPersonID: id,
                                reaction: like
                            };
    
                           reactions[like] += 1;
    
                           peopleReacted.push(newPerson);
    
                           peopleReactedIDs.push(id);
    
                           axios.get(`${config.get("ngrok_url")}/gather/breif/information/about/user/custom`, {
                                params: {
                                    userId: wallPost.poster,
                                    otherUserID: wallPost.newData.poster
                                }
                            }).then((responseeeee) => {
    
                                collection.save(userrrrrrr).then(() => {
    
                                    const { original, shared } = responseeeee.data.selected;
                                
                                    wallPost.accountType = original.accountType;
                                    wallPost.username = original.username;
                                    wallPost.firstName = original.firstName;
                                    wallPost.lastName = original.lastName;
                                    wallPost.birthdate = original.birthdate;
                                    wallPost.photo = _.has(original, 'photo') ? original.photo : null;
                                    wallPost.profilePics = _.has(original, "profilePics") ? original.profilePics : null;
    
                                    ///////////////////////////////////////////////   
                                    
                                    wallPost.newData.accountType = shared.accountType;
                                    wallPost.newData.username = shared.username;
                                    wallPost.newData.firstName = shared.firstName;
                                    wallPost.newData.lastName = shared.lastName;
                                    wallPost.newData.birthdate = shared.birthdate;
                                    wallPost.newData.photo = _.has(shared, 'photo') ? shared.photo : null;
                                    wallPost.newData.profilePics = _.has(shared, "profilePics") ? shared.profilePics : null;
    
    
                                    resppppppp.json({
                                        message: "Reacted to post!",
                                        post: wallPost,
                                        alteredID: wallPost.id
                                    })
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
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

            resppppppp.json({
                err,
                message: "Critical error occurred..."
            })
        })
    });
});

module.exports = router;