const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, post } = req.body;

        console.log("gatherPeopleReactedMore", req.body);

        const promises = [];

        for (let index = 0; index < post.peopleReacted.length; index++) {
            const person = post.peopleReacted[index];
            
            promises.push(new Promise((resolve, reject) => {

                axios.get(`${config.get("ngrok_url")}/gather/more/basic/info`, {
                    params: {
                        userID: person.reactingPersonID
                    }
                }).then((res) => {

                    const { photo, type, user } = res.data;

                    person.profilePic = photo;
                    person.profilePicType = type;
                    person.username = user.username;
                    person.firstName = user.firstName;
                    person.lastName = user.lastName;
                    person.accountType = user.accountType;

                    resolve(person);

                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                })
            }))
        }


        Promise.all(promises).then((values) => {
            res.json({
                message: "Gathered information!",
                values
            })
        })
    });
});

module.exports = router;