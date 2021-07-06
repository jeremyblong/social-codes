const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, notification } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        const promises = [];

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                const arrayBreaker = (target, ...test) => {
                    const res = target.filter(val => !test.includes(val.id));
                    target.length = 0;
                    target.push(...res);
                    return target;
                }


                const changed = arrayBreaker(user.notifications, notification.id);

                user.notifications = changed;

                collection.save(user);
                  
                for (let index = 0; index < changed.length; index++) {
                    const element = changed[index];

                    const promiseee = new Promise((resolve, reject) => {
                        axios.get(`${config.get("ngrok_url")}/gather/breif/information/about/user`, {
                            params: {
                                userId: element.from
                            }
                        }).then((res) => {
                            
                            const { accountType, username, firstName, lastName, birthdate } = res.data.user;
    
                            element.accountType = accountType;
                            element.username = username;
                            element.firstName = firstName;
                            element.lastName = lastName;
                            element.birthdate = birthdate;
                            element.photo = _.has(res.data.user, 'photo') ? res.data.user.photo : null;
                            element.profilePics = _.has(res.data.user, "profilePics") ? res.data.user.profilePics : null;

                            resolve(element);

                        }).catch((err) => {
                            console.log(err);

                            reject();
                        })
                    })

                    promises.push(promiseee);
                }

                Promise.all(promises).then((passedValues) => {
                    res.json({
                        message: "Deleted Notification!",
                        notifications: passedValues
                    })
                })
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