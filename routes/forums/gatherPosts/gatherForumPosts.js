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

        const database = db.db("db");

        const collection = database.collection("forums");

        collection.find({}).toArray((err, posts) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Encountered a critical error!",
                    err
                })
            } else {

                const promises = [];


                for (let index = 0; index < posts.length; index++) {
                    const post = posts[index];
                    
                    promises.push(new Promise((resolve, reject) => {
                        axios.get(`${config.get("ngrok_url")}/gather/more/basic/info`, {
                            params: {
                                userID: post.poster
                            }
                        }).then((response) => {
                            if (response.data.message === "Located the desired user!") {
                                
                                console.log("response.data.user", response.data.user);
                                
                                const { username, firstName, lastName, accountType, birthdate } = response.data.user;
    
                                post.photo = _.has(response.data.user, 'photo') ? response.data.user.photo : null;
                                post.profilePics = _.has(response.data.user, "profilePics") ? response.data.user.profilePics : null;
                                post.username = username;
                                post.firstName = firstName;
                                post.lastName = lastName;
                                post.accountType = accountType;
                                post.birthdate = birthdate;
    
                                resolve(post);
                                console.log(response.data);
                            } else {
                                console.log("err", response.data);
                                
                                reject();
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    }))
                }


                Promise.all(promises).then((values) => {
                    res.json({
                        message: "Gathered forum posts!",
                        posts: values
                    })
                })
            }
        });
    });
});

module.exports = router;