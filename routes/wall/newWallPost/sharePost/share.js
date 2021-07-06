const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, post, newText, fullName, username, tagged } = req.body;

        const copy = [...tagged];

        tagged.push(username);

        console.log("req.body share.js:", req.body);

        const database = db.db("db");

        const collection = database.collection("users");

        const configgg = {
            headers: {
                "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                "Content-Type": "application/json"
            }
        }

        collection.find({ username: { $in: tagged }}).toArray((err, users) => {
            if (err) {

                res.json({
                    message: "Error occurred while locating BOTH users...",
                    err
                })
            } else {
                // console.log("copy ONE:", copy);

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];

                        if (tagged.includes(user.username) && user.username !== username) {
                            // other user
                            if (user.unique_id === post.poster) {

                                console.log("MATCHES POSTER....");

                                axios.post("https://fcm.googleapis.com/fcm/send", {
                                    "to": user.firebasePushNotificationToken,
                                    "notification": {
                                        "title": `${fullName} shared one of your posts and also tagged you in a post!`,
                                        "body": `${fullName} said... ${newText}`,
                                        "mutable_content": true,
                                        "sound": "Tri-tone"
                                    },
                                    "data": {
                                        "url": `${config.get("logoImage")}`,
                                        "dl": "notifications"
                                    }
                                }, configgg).then((res) => {
        
                                    console.log("RES", res.data);

                                    const notificationAddition = {
                                        id: uuidv4(),
                                        system_date: Date.now(),
                                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                        data: {
                                            title: `${fullName} shared one of your posts on their timeline, check out what they said!`,
                                            body: `${fullName} said... ${newText}`,
                                        },
                                        from: id,
                                        link: "shared-post"
                                    };

                                    if (user.notifications) {
                                        user.notifications.push(notificationAddition);
                                    } else {
                                        user["notifications"] = [notificationAddition];
                                    }
                                    
                                    collection.save(user);
        
                                    if ((users.length - 1) === index) {
                                        resolve();
                                    }

                                }).catch((err) => {
                                    console.log(err);

                                    if ((users.length - 1) === index) {
                                        resolve();
                                    }
                                })
                            } else {
                                const nofitication_addition = {
                                    id: uuidv4(),
                                    system_date: Date.now(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    data: {
                                        title: `${fullName} tagged you in a wall posting on their feed!`,
                                        body: `${fullName} has included you in a wall posting status update, go to their profile to check out what they said!`
                                    },
                                    from: id,
                                    link: "notifications"
                                };
                
                                axios.post("https://fcm.googleapis.com/fcm/send", {
                                    "to": user.firebasePushNotificationToken,
                                    "notification": {
                                        "title": `${fullName} tagged you in a wall posting on their feed!`,
                                        "body": `${fullName} has included you in a wall posting status update, go to their profile to check out what they said!`,
                                        "mutable_content": true,
                                        "sound": "Tri-tone"
                                    },
                                    "data": {
                                        // use company logo 
                                        "url": `${config.get("logoImage")}`,
                                        "dl": "notifications"
                                        // use company logo ^^^^^^^^^^^^^^^^^^^^^^^^^
                                    }
                                }, configgg).then((res) => {
        
                                    console.log("RES", res.data);
                
                                    if (user.notifications) {
                                        user.notifications.push(nofitication_addition);
                                    } else {
                                        user["notifications"] = [nofitication_addition];
                                    }
                                    
                                    collection.save(user);
        
                                    if ((users.length - 1) === index) {
                                        resolve();
                                    }
                
                                }).catch((err) => {
                                    console.log(err);

                                    if ((users.length - 1) === index) {
                                        resolve();
                                    }
                                })
                            }
                        } else {
                            if ((users.length - 1) === index) {
                                resolve();
                            }
                        }
                    }
                });

                promiseee.then(() => {

                    console.log("RESOLVED.");

                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        
                        // signed-in user
                        if (user.unique_id === id) {
                            console.log("signed in user...", user);

                            const { date, systemDate, text, pictures, visibility, poster, reactions, except, peopleReacted, peopleReactedIDs } = post;

                            const newWallPost = {
                                id: uuidv4(),
                                date,
                                systemDate,
                                text,
                                pictures,
                                visibility,
                                poster,
                                reactions: {
                                    screaming: reactions.screaming,
                                    exploding: reactions.exploding,
                                    tearsOfJoy: reactions.tearsOfJoy,
                                    clapping: reactions.clapping,
                                    angry: reactions.angry,
                                    heart: reactions.heart,
                                    wow: reactions.wow
                                },
                                shared: true,
                                except,
                                peopleReacted,
                                peopleReactedIDs,
                                relatedPost: post.id,
                                newData: {
                                    text: newText,
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    systemDate: Date.now(),
                                    id: uuidv4(),
                                    peopleReacted: [],
                                    peopleReactedIDs: [],
                                    visibility: _.has(user, "wallPostVisibility") ? user.wallPostVisibility : "friends",
                                    reactions: {
                                        screaming: 0,
                                        exploding: 0,
                                        tearsOfJoy: 0,
                                        clapping: 0,
                                        angry: 0,
                                        heart: 0,
                                        wow: 0
                                    },
                                    except: [],
                                    poster: id,
                                    taggedUsers: copy.length > 0 ? copy : null
                                }
                            };

                            if (user.wallPosts) {
                                user.wallPosts.push(newWallPost);
                            } else {
                                user["wallPosts"] = [newWallPost];
                            }
            
                            collection.save(user);

                            res.json({
                                message: "Successfully shared wall post!"
                            })
                        }
                    }
                });
            }
        })
    });
});

module.exports = router;