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

        collection.findOne({ unique_id: id }, { fields: { activeInterviews: 1 }}).then((user) => {
            if (user) {

                if (typeof user.activeInterviews !== "undefined" && user.activeInterviews.length > 0) {

                    for (let index = 0; index < user.activeInterviews.length; index++) {
                        const interview = user.activeInterviews[index];
                        
                        promises.push(new Promise((resolve, reject) => {
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

                                resolve(interview);

                            }).catch((errrrr) => {
                                console.log(errrrr);

                                reject();
                            })
                        }))
                    }

                    Promise.all(promises).then((values) => {
                        res.json({
                            message: "Gathered interviews!",
                            interviews: values
                        })
                    })
                } else {
                    res.json({
                        message: "Gathered interviews!",
                        interviews: user.activeInterviews
                    })
                }
            } else {
                res.json({
                    message: "Could NOT locate user..."
                })
            }
        }).catch((err) => {
            
            console.log("ERR:", err);

            res.json({
                err,
                message: "Critical error occurred..."
            })
        })
    });
});

module.exports = router;