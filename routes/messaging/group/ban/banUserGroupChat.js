const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, respppppp) => {

        const { 
            otherID,
            GUID,
            id,
            fullName
        } = req.body;

        console.log(req.body);

        const database = db.db("db");

        const collection = database.collection("users");

        collection.updateOne({ unique_id: otherID }, { $pull: { "groupConversations": { "guid": GUID }}}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("result", result);

                collection.findOne({ unique_id: otherID }).then((user) => {
                    console.log(user);

                    const configgg = {
                        headers: {
                            "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                            "Content-Type": "application/json"
                        }
                    }
    
                    const notificationAddition = {
                        id: uuidv4(),
                        system_date: Date.now(),
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        data: {
                            title: `${fullName} banned you from a group chat you were involved in...`,
                            body: `${fullName} has permanently banned you from the group with the ID of - ${GUID}`
                        },
                        from: id,
                        link: "banned-group-chat"
                    };
    
                    axios.post("https://fcm.googleapis.com/fcm/send", {
                        "to": user.firebasePushNotificationToken,
                        "notification": {
                            "title": `${fullName} banned you from a group chat you were involved in...`,
                            "body": `${fullName} has permanently banned you from the group with the ID of - ${GUID}`,
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
    
                        respppppp.json({
                            message: "Banned!"
                        })
    
                    }).catch((err) => {
                        console.log(err);

                        respppppp.json({
                            message: "Banned!",
                            error: "Didn't notify but successfully banned..."
                        })
                    })
                }).catch((error) => {
                    console.log(error)
                })
            }
        });
    });
});

module.exports = router;