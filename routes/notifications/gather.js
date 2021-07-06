const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }, { fields: { notifications: 1 }}).then((user) => {
            if (user) {
                console.log(user);

                const promises = [];

                if (typeof user.notifications !== "undefined" && user.notifications.length > 0) {
                    for (let index = 0; index < user.notifications.length; index++) {
                        const notification = user.notifications[index];
                        
    
                        const promiseee = new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/breif/information/about/user`, {
                                params: {
                                    userId: notification.from
                                }
                            }).then((res) => {
                                
                                const { accountType, username, firstName, lastName, birthdate } = res.data.user;
    
                                notification.accountType = accountType;
                                notification.username = username;
                                notification.firstName = firstName;
                                notification.lastName = lastName;
                                notification.birthdate = birthdate;
                                notification.photo = _.has(res.data.user, 'photo') ? res.data.user.photo : null;
                                notification.profilePics = _.has(res.data.user, "profilePics") ? res.data.user.profilePics : null;
    
                                resolve(notification);
                            }).catch((err) => {
                                console.log(err);
    
                                reject();
                            })
                        })
    
                        promises.push(promiseee);
                    }
    
                    Promise.all(promises).then((values) => {
                        res.json({
                            message: "Gathered notifications!",
                            notifications: values
                        })
                    })
                } else {
                    res.json({
                        message: "Gathered notifications!",
                        notifications: []
                    })
                }
            } else {
                res.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;