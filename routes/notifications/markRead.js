const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { notification, id } = req.body;

        const database = db.db("db");

        const promises = [];

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.notifications.length; index++) {
                    const notify = user.notifications[index];
                    
                    if (notify.id === notification.id) {
                        if (_.has(notify, "read")) {
                            notify.read = true;
                        } else {
                            notify["read"] = true;
                        }

                        collection.save(user);

                        const promiseee = new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/breif/information/about/user`, {
                                params: {
                                    userId: notify.from
                                }
                            }).then((res) => {
                                
                                const { accountType, username, firstName, lastName, birthdate } = res.data.user;
        
                                notify.accountType = accountType;
                                notify.username = username;
                                notify.firstName = firstName;
                                notify.lastName = lastName;
                                notify.birthdate = birthdate;
                                notify.photo = _.has(res.data.user, 'photo') ? res.data.user.photo : null;
                                notify.profilePics = _.has(res.data.user, "profilePics") ? res.data.user.profilePics : null;
    
                                resolve(notify);
                            }).catch((err) => {
                                console.log(err);
    
                                reject();
                            })
                        })
    
                        promises.push(promiseee);

                    } else {
                        const promiseee = new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/breif/information/about/user`, {
                                params: {
                                    userId: notify.from
                                }
                            }).then((res) => {
                                
                                const { accountType, username, firstName, lastName, birthdate } = res.data.user;
        
                                notify.accountType = accountType;
                                notify.username = username;
                                notify.firstName = firstName;
                                notify.lastName = lastName;
                                notify.birthdate = birthdate;
                                notify.photo = _.has(res.data.user, 'photo') ? res.data.user.photo : null;
                                notify.profilePics = _.has(res.data.user, "profilePics") ? res.data.user.profilePics : null;
    
                                resolve(notify);
                            }).catch((err) => {
                                console.log(err);
    
                                reject();
                            })
                        })
    
                        promises.push(promiseee);

                    }
                }

                Promise.all(promises).then((values) => {
                    res.json({
                        message: "Marked!",
                        notifications: values
                    })
                })
            } else {
                res.json({
                    message: "User does NOT exist!"
                })
            }
        }).catch((err) => {
            console.log(err);
        })

    });
});

module.exports = router;