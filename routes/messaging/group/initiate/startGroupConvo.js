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

        const { privacy, selected, group, id, others } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        const includeSelf = [...others, id];

        collection.find({ unique_id: { $in: includeSelf }}).toArray((error, users) => {
            if (error) {
                console.log(error);

                res.json({
                    message: "Users could NOT be found.",
                    error
                })
            } else {

                const customGroup = {
                    ...group,
                    selected,
                    privacy
                };

                const finalizedUsers = [];

                for (let index = 0; index < users.length; index++) {

                    const user = users[index];

                    if ((users.length - 2) === index) {
                        if(user.unique_id === id) {
                            // self

                            console.log("match ID")

                            axios.get(`${config.get("ngrok_url")}/gather/user/pics/only`, {
                                params: {
                                    id: user.unique_id
                                }
                            }).then((responseeeeee) => {
                                if (responseeeeee.data.message === "Located the desired user!") {

                                    const { profilePics } = responseeeeee.data;

                                    console.log("ran!");

                                    customGroup["profilePic"] =  (typeof profilePics !== "undefined" && profilePics.length > 0 ? profilePics : {
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        id: uuidv4(),
                                        picture: "no-image-available.jpeg",
                                        type: "picture",
                                        systemDate: Date.now()
                                    });

                                    respppppp.json({
                                        message: "Initiated group!",
                                        customGroup,
                                        users: finalizedUsers
                                    })
                                } else {
                                    respppppp.json({
                                        message: "Initiated group!",
                                        customGroup,
                                        users: finalizedUsers
                                    })
                                }
                            }).catch((errrrrrrror) => {
                                console.log(errrrrrrror);
                            })
                        } else {
                            axios.get(`${config.get("ngrok_url")}/gather/user/pics/only`, {
                                params: {
                                    id: user.unique_id
                                }
                            }).then((responseeeeee) => {
                                if (responseeeeee.data.message === "Located the desired user!") {

                                    const { profilePics } = responseeeeee.data;

                                    console.log("ran!");

                                    customGroup["profilePic"] =  (typeof profilePics !== "undefined" && profilePics.length > 0 ? profilePics : {
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        id: uuidv4(),
                                        picture: "no-image-available.jpeg",
                                        type: "picture",
                                        systemDate: Date.now()
                                    });

                                    respppppp.json({
                                        message: "Initiated group!",
                                        customGroup,
                                        users: finalizedUsers
                                    })
                                } else {
                                    respppppp.json({
                                        message: "Initiated group!",
                                        customGroup,
                                        users: finalizedUsers
                                    })
                                }
                            }).catch((errrrrrrror) => {
                                console.log(errrrrrrror);
                            })
                        }
                    } else {
                        if(user.unique_id === id) {
                            // self
    
                            axios.get(`${config.get("ngrok_url")}/gather/user/pics/only`, {
                                params: {
                                    id: user.unique_id
                                }
                            }).then((responseeeeee) => {
                                if (responseeeeee.data.message === "Located the desired user!") {

                                    const { profilePics } = responseeeeee.data;

                                    console.log("ran!");

                                    customGroup["profilePic"] =  (typeof profilePics !== "undefined" && profilePics.length > 0 ? profilePics : {
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        id: uuidv4(),
                                        picture: "no-image-available.jpeg",
                                        type: "picture",
                                        systemDate: Date.now()
                                    });

                                    respppppp.json({
                                        message: "Initiated group!",
                                        customGroup,
                                        users: finalizedUsers
                                    })
                                } else {
                                    respppppp.json({
                                        message: "Initiated group!",
                                        customGroup,
                                        users: finalizedUsers
                                    })
                                }
                            }).catch((errrrrrrror) => {
                                console.log(errrrrrrror);
                            })
                        } else {
                            axios.get(`${config.get("ngrok_url")}/gather/user/pics/only`, {
                                params: {
                                    id: user.unique_id
                                }
                            }).then((responseeeeee) => {
                                if (responseeeeee.data.message === "Located the desired user!") {

                                    const { profilePics } = responseeeeee.data;

                                    console.log("ran!");

                                    customGroup["profilePic"] =  (typeof profilePics !== "undefined" && profilePics.length > 0 ? profilePics : {
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        id: uuidv4(),
                                        picture: "no-image-available.jpeg",
                                        type: "picture",
                                        systemDate: Date.now()
                                    });

                                    respppppp.json({
                                        message: "Initiated group!",
                                        customGroup,
                                        users: finalizedUsers
                                    })
                                } else {
                                    respppppp.json({
                                        message: "Initiated group!",
                                        customGroup,
                                        users: finalizedUsers
                                    })
                                }
                            }).catch((errrrrrrror) => {
                                console.log(errrrrrrror);
                            })
                        }
                    }
                }
            }
        })
    });
});

module.exports = router;