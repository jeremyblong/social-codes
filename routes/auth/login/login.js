const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const request = require('request');
const tokenGenerator = require('../../../twiloTokenGenerator.js');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { emailOrUsername, password } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        const trimmed = emailOrUsername.toLowerCase().trim();

        collection.findOne({ $or: [
            { loginUsername: trimmed },
            { loginEmail: trimmed }
        ]}).then((user) => {
            if (user) {
                if ((user.loginUsername === trimmed || user.loginEmail === trimmed) && user.loginPassword === password) {

                    const options = {
                        method: 'POST',
                        url: 'https://auth.emsicloud.com/connect/token',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        form: {
                            client_id: config.get("emsiSkillsAPIClientID"),
                            client_secret: config.get("emsiSkillsAPISecret"),
                            grant_type: 'client_credentials',
                            scope: config.get("emsiSkillsScope")
                        }
                    };
                    
                    request(options, (error, response, body) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(body);

                            const identity = user.username;

                            user.skillsApiToken = JSON.parse(body).access_token;

                            user.twilioJWTAuthToken = tokenGenerator(identity);

                            collection.save(user);
    
                            res.json({
                                message: "Successfully authenticated!",
                                user
                            })
                        }
                    });
                } else {
                    res.json({
                        message: "Password/email did match our records..."
                    })
                }
            } else {
                res.json({
                    message: "Could NOT find user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;