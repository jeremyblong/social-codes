const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint(config.get("wasabiEndpoint"));
const axios = require("axios");

const accessKeyId = config.get("wasabiAccessKey");
const secretAccessKey = config.get("wasabiSecretAccessKey");

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: config.get("wasabiRegion"),
	accessKeyId,
	secretAccessKey
});


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, respppppppp) => {

        const { id, post, comment, picture, base64, commentID, otherUserName, selectedComment } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ "wallPosts.id": post.id }).then((otherUser) => {
            if (otherUser) {
                console.log("otherUser", otherUser);

                for (let index = 0; index < otherUser.wallPosts.length; index++) {
                    const wall = otherUser.wallPosts[index];
                    // check to find matching post
                    if (wall.id === post.id) {

                        const generatedID = uuidv4();

                        for (let index = 0; index < wall.comments.length; index++) {
                            const comm = wall.comments[index];
                            // check for comment match
                            if (comm.id === commentID) {
                                if (picture !== null) {
                                    // matching - do logic

                                    const commenttt = {
                                        id: uuidv4(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        systemDate: Date.now(),
                                        comment,
                                        poster: id,
                                        subComments: [],
                                        reactions: {
                                            screaming: 0,
                                            exploding: 0,
                                            tearsOfJoy: 0,
                                            clapping: 0,
                                            angry: 0,
                                            heart: 0,
                                            wow: 0
                                        },
                                        attachedPhoto: generatedID,
                                        taggedUser: {
                                            id: selectedComment.poster,
                                            otherUserName
                                        }
                                    };

                                    if (typeof comm.subComments !== "undefined" && _.has(comm, "subComments")) {
                                        comm.subComments.push(commenttt);
                                    } else {
                                        comm["subComments"] = [commenttt];
                                    }
        
                                    const bufferImage = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""),'base64');
        
                                    s3.putObject({
                                        Body: bufferImage,
                                        Bucket: config.get("wasabiBucket"),
                                        Key: generatedID,
                                        ContentEncoding: 'base64'
                                    }, (errorr, dataaa) => {
                                        if (errorr) {
                                            console.log(errorr);
                                        }
                                        console.log(dataaa);
        
                                        collection.save(otherUser, (err, result) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
        
                                                axios.get(`${config.get("ngrok_url")}/gather/brief/info/name/and/pictures`, {
                                                    params: {
                                                        id: commenttt.poster
                                                    }
                                                }).then((res) => {
                                                    if (res.data.message === "Located data!") {
                                                        console.log(res.data);
                                
                                                        const { photo, name, type } = res.data;
                                
                                                        commenttt.profilePic = photo;
                                                        commenttt.type = type;
                                                        commenttt.name = name;
                            
                                                        respppppppp.json({
                                                            message: "Posted comment!",
                                                            picture: generatedID,
                                                            comment: commenttt
                                                        })
                                                    } else {
                                                        console.log("err", res.data);
                                                    }
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                            }
                                        });
                                    });
                                } else {
                                    const commenttt = {
                                        id: uuidv4(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        systemDate: Date.now(),
                                        comment,
                                        poster: id,
                                        subComments: [],
                                        reactions: {
                                            screaming: 0,
                                            exploding: 0,
                                            tearsOfJoy: 0,
                                            clapping: 0,
                                            angry: 0,
                                            heart: 0,
                                            wow: 0
                                        },
                                        attachedPhoto: null,
                                        taggedUser: {
                                            id: selectedComment.poster,
                                            otherUserName
                                        }
                                    };
        

                                    if (typeof comm.subComments !== "undefined" &&  _.has(comm, "subComments")) {
                                        comm.subComments.push(commenttt);
                                    } else {
                                        comm["subComments"] = [commenttt];
                                    }

                                    
                                    collection.save(otherUser, (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
        
                                            axios.get(`${config.get("ngrok_url")}/gather/brief/info/name/and/pictures`, {
                                                params: {
                                                    id: commenttt.poster
                                                }
                                            }).then((res) => {
                                                if (res.data.message === "Located data!") {
                                                    console.log(res.data);
                            
                                                    const { photo, name, type } = res.data;
                            
                                                    commenttt.profilePic = photo;
                                                    commenttt.type = type;
                                                    commenttt.name = name;
                        
                                                    respppppppp.json({
                                                        message: "Posted comment!",
                                                        picture: null,
                                                        comment: commenttt
                                                    })
                                                } else {
                                                    console.log("err", res.data);
                                                }
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                        }
                                    });
                                }
                            }
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