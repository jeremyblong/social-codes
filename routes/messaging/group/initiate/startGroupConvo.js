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

        const { privacy, selected, group, id, others, fullName } = req.body;

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

                console.log("users", users);

                const customGroup = {
                    ...group,
                    selected,
                    privacy
                };

                const configgg = {
                    headers: {
                        "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                        "Content-Type": "application/json"
                    }
                };

                const notificationAddition = {
                    id: uuidv4(),
                    system_date: Date.now(),
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    data: {
                        title: `${fullName} invited you to a group and you have automatically joined!`,
                        body: `${fullName} sent you a group invitation and you were automatically joined - if you'd like to not join this group you can visit the group and hit the 'leave group' option`,
                        data: group
                    },
                    from: id,
                    link: "started-group-chat"
                };

                const generated = (Math.floor(Math.random() * (users.length - 1)) + 1);


                for (let index = 0; index < users.length; index++) {
                    const user = users[index];

                    if (generated === index) {
                        customGroup["profilePic"] =  (typeof user.profilePics !== "undefined" && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1] : {
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            id: uuidv4(),
                            picture: "no-image-available.jpeg",
                            type: "picture",
                            systemDate: Date.now()
                        });
                    }

                    if (user.unique_id !== id) {
                        axios.post("https://fcm.googleapis.com/fcm/send", {
                            "to": user.firebasePushNotificationToken,
                            "notification": {
                                "title": `${fullName} invited you to a group and you have automatically joined!`,
                                "body": `${fullName} sent you a group invitation and you were automatically joined - if you'd like to not join this group you can visit the group and hit the 'leave group' option`,
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
                                user.notifications.push(notificationAddition);
                            } else {
                                user["notifications"] = [notificationAddition];
                            }
                            
                            collection.save(user);

                            if ((users.length - 1) === index) {
                                respppppp.json({
                                    message: "Initiated group!",
                                    customGroup,
                                    users
                                })
                            }
        
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else {
                        if ((users.length - 1) === index) {
                            respppppp.json({
                                message: "Initiated group!",
                                customGroup,
                                users
                            })
                        }
                    }
                }
            }
        })
    });
});

module.exports = router;