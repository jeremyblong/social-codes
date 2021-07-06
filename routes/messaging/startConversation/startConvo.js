const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, response) => {

        const database = db.db("db");

        const collection = database.collection("users");

        const { 
            other_user,
            user,
            fullName,
            message,
            subject 
        } = req.body;

        collection.find({ unique_id: { $in: [ other_user, user ] }}).toArray((err, users) => {
            if (err) {
                console.log(err);

                response.json({
                    err,
                    message: "Could not find users, error occurred."
                })
            } else {
                console.log(users);

                for (let index = 0; index < users.length; index++) {
                    const userrr = users[index];
                    
                    if (userrr.unique_id === other_user) {
                        // other user

                        const configgg = {
                            headers: {
                                "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                "Content-Type": "application/json"
                            }
                        }
        
                        const nofitication_addition = {
                            id: uuidv4(),
                            system_date: Date.now(),
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            data: {
                                title: `You have a new private message from ${fullName}`,
                                body: `Subject: ${subject} \n \nMessage: ${message}`
                            },
                            from: user,
                            link: "notifications"
                        };
        
                        axios.post("https://fcm.googleapis.com/fcm/send", {
                            "to": userrr.firebasePushNotificationToken,
                            "notification": {
                                "title": `You have a new private message from ${fullName}`,
                                "body": subject.toString(),
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
        
                            if (userrr.notifications) {
                                userrr.notifications.push(nofitication_addition);
                            } else {
                                userrr["notifications"] = [nofitication_addition];
                            }
                            
                            collection.save(userrr);

                            response.json({
                                message: "Sent notification and message!"
                            })
        
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }
            }
        })
    });
});

module.exports = router;