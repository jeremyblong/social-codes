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
    router.post("/", (req, respppppppp) => {

        const { id, post } = req.body;

        const database = db.db("db");

        console.log(req.body);

        const collection = database.collection("users");

        collection.findOne({ "wallPosts.newData.id": post.newData.id }).then((userrrrrrr) => {
            if (userrrrrrr) {
                for (let index = 0; index < userrrrrrr.wallPosts.length; index++) {
                    const wallPost = userrrrrrr.wallPosts[index];
                    // if post matches the post reacted to
                    if (_.has(wallPost, "newData")) {
                        if (wallPost.newData.id === post.newData.id) {

                            // remove from peopleReacted array
                            const indexed = wallPost.newData.peopleReacted.findIndex(({ reactingPersonID }) => {
                                if (reactingPersonID === id) {
                                    return reactingPersonID;
                                }
                            });

                            console.log("INDEXED", indexed);

                            // remove like
                            wallPost.newData.reactions[wallPost.newData.peopleReacted[indexed].reaction] -= 1;

                            if (indexed !== -1) {
                                wallPost.newData.peopleReacted.splice(indexed, 1);
                            }

                            // remove from userrrrrrrs id's array
                            
                            wallPost.newData.peopleReactedIDs = wallPost.newData.peopleReactedIDs.filter((item) => {
                                if (item !== id) {
                                    return item;
                                }
                            });

                            delete wallPost.newData.accountType;
                            delete wallPost.newData.username;
                            delete wallPost.newData.firstName;
                            delete wallPost.newData.lastName;
                            delete wallPost.newData.birthdate;
                            delete wallPost.newData.photo;
                            delete wallPost.newData.profilePics;

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


                                    respppppppp.json({
                                        message: "Revoke/remove like!",
                                        post: wallPost
                                    })
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    }
                }
            } else {
                respppppppp.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;