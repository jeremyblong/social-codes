const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");
const axios = require("axios");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                const promises = [];

                if (typeof user.friendRequests !== "undefined" && user.friendRequests.length > 0) {
                    for (let index = 0; index < user.friendRequests.length; index++) {
                        const friend = user.friendRequests[index];
                        
    
                        const promiseee = new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/breif/information/about/user`, {
                                params: {
                                    userId: friend.requestee
                                }
                            }).then((res) => {
                                
                                if (res.data.user) {
                                    const { accountType, username, firstName, lastName, birthdate } = res.data.user;
        
                                    friend.accountType = accountType;
                                    friend.username = username;
                                    friend.firstName = firstName;
                                    friend.lastName = lastName;
                                    friend.birthdate = birthdate;
                                    friend.photo = _.has(res.data.user, 'photo') ? res.data.user.photo : null;
                                    friend.profilePics = _.has(res.data.user, "profilePics") ? res.data.user.profilePics : null;
    
                                    resolve(friend);
                                } else {
                                    reject();
                                }
    
                            }).catch((err) => {
                                console.log(err);
    
                                reject();
                            })
                        })
    
                        promises.push(promiseee);
                    }
    
                    Promise.all(promises).then((values) => {
                        console.log("values", values);
    
                        res.json({
                            message: "Located requests and gathered info!",
                            friends: values
                        })
                    })
                } else {
                    res.json({
                        message: "Located requests and gathered info!",
                        friends: []
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