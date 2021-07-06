const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const _ = require("lodash");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, resp) => {

        const database = db.db("db");

        const collection = database.collection("users");

        collection.distinct("wallPosts", (err, posts) => {
            if (err) {
                console.log(err);

                resp.json({
                    message: "Critical error occurred...",
                    err
                })
            } else {

                const promises = [];

                for (let index = 0; index < posts.slice(0, 6).length; index++) {
                    const post = posts[index];
                    
                    if (_.has(post, "newData")) {
                        const promiseee = new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/breif/information/about/user/custom`, {
                                params: {
                                    userId: post.poster,
                                    otherUserID: post.newData.poster
                                }
                            }).then((responseeeee) => {

                                const { original, shared } = responseeeee.data.selected;
                                
                                post.accountType = original.accountType;
                                post.username = original.username;
                                post.firstName = original.firstName;
                                post.lastName = original.lastName;
                                post.birthdate = original.birthdate;
                                post.photo = _.has(original, 'photo') ? original.photo : null;
                                post.profilePics = _.has(original, "profilePics") ? original.profilePics : null;

                                ///////////////////////////////////////////////   
                                
                                post.newData.accountType = shared.accountType;
                                post.newData.username = shared.username;
                                post.newData.firstName = shared.firstName;
                                post.newData.lastName = shared.lastName;
                                post.newData.birthdate = shared.birthdate;
                                post.newData.photo = _.has(shared, 'photo') ? shared.photo : null;
                                post.newData.profilePics = _.has(shared, "profilePics") ? shared.profilePics : null;

                                resolve(post);
                            }).catch((err) => {
                                console.log(err);
    
                                resolve();
                            })
                        });

                        promises.push(promiseee);

                    } else {
                        const promiseOne = new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/breif/information/about/user`, {
                                params: {
                                    userId: post.poster
                                }
                            }).then((res) => {
                                
                                const { accountType, username, firstName, lastName, birthdate } = res.data.user;
        
                                post.accountType = accountType;
                                post.username = username;
                                post.firstName = firstName;
                                post.lastName = lastName;
                                post.birthdate = birthdate;
                                post.photo = _.has(res.data.user, 'photo') ? res.data.user.photo : null;
                                post.profilePics = _.has(res.data.user, "profilePics") ? res.data.user.profilePics : null;
    
                                resolve(post);
                            }).catch((err) => {
                                console.log(err);
    
                                resolve();
                            })
                        });

                        promises.push(promiseOne);
                    }
                }

                Promise.all(promises).then((values) => {
                    console.log("values", values);

                    resp.json({
                        message: "Gathered posts!",
                        posts: values
                    })
                })
            }
        })
    });
});

module.exports = router;