const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const request = require('request');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, query, title, description } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                
                console.log(user);

                const options = {
                    method: 'GET',
                    url: 'https://emsiservices.com/skills/versions/latest/skills',
                    qs: { q: query },
                    headers: {
                        Authorization: `Bearer ${user.skillsApiToken}`
                    }
                };

                request(options, (error, response, body) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("body", body);

                        res.json({
                            message: "Generated tags!",
                            tags: JSON.parse(body).data
                        })
                    }
                });
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