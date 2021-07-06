const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const request = require('request');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, query } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                console.log(user);

                const options = {
                    method: 'GET',
                    url: 'https://emsiservices.com/skills/versions/latest/skills',
                    qs: {
                        q: query
                    },
                    headers: {
                        Authorization: `Bearer ${user.skillsApiToken}`
                    }
                };
                  
                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                  
                    console.log(body);

                    res.json({
                        message: "Gathered results",
                        body: JSON.parse(body).data
                    })
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