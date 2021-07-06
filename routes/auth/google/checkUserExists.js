const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const request = require('request');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { googleID } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ googleID: googleID }).then((user) => {
            if (user) {
                
                console.log(user);

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

                        user.skillsApiToken = JSON.parse(body).access_token;

                        collection.save(user);

                        res.json({
                            message: "User ALREADY exists - just login.",
                            user
                        })
                    }
                });
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