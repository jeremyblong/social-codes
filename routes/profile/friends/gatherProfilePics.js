const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        const promises = [];

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                if (user.acceptedFriendRequests) {
                    for (let index = 0; index < user.acceptedFriendRequests.length; index++) {
                        const request = user.acceptedFriendRequests[index];
                        
                        promises.push(new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/get/picture/only/friends/list`, {
                                params: {
                                    id: request.acquaintanceID
                                }
                            }).then((res) => {
                                if (res.data.message === "Located user photo") {

                                    const { photo, type } = res.data;

                                    request.photo = photo;
                                    request.type = type;

                                    resolve(request);
                                } else {
                                    const { photo, type } = res.data;

                                    request.photo = photo;
                                    request.type = type;
                                    
                                    resolve(request);
                                }
                
                            }).catch((err) => {
                
                                reject(err);
                            })
                        }))
                    }

                    Promise.all(promises).then((passedValues) => {
                        res.json({
                            message: "Gathered profile pics!",
                            passed: passedValues
                        })
                    })
                } else {
                    res.json({
                        message: "Could NOT locate any information..."
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