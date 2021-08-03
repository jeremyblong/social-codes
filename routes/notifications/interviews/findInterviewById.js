const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, resppppp) => {

        const { id, interviewID } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                for (let iiii = 0; iiii < user.activeInterviews.length; iiii++) {
                    const interview = user.activeInterviews[iiii];
                    // check if interview matches existing/selected interview
                    if (interviewID === interview.id) {
                        
                        axios.get(`${config.get("ngrok_url")}/gather/breif/info/applicant`, {
                            params: {
                                applicantID: interview.with
                            }
                        }).then((response) => {

                            const { user } = response.data;

                            interview.firstName = user.firstName
                            interview.lastName = user.lastName;
                            interview.profilePics = user.profilePics;
                            interview.photo = user.photo;
                            interview.username = user.username;
                            interview.accountType = user.accountType;

                            resppppp.json({
                                message: "Located interview!",
                                interview
                            })

                        }).catch((errrrr) => {
                            console.log(errrrr);

                            resppppp.json({
                                message: "Error locating interview data..."
                            })
                        })
                    }
                }
            } else {
                resppppp.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;