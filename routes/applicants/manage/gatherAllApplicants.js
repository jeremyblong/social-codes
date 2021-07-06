const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const _ = require("lodash");
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                const promises = [];

                if (_.has(user, "applicantsForPostedJobs")) {
                    for (let index = 0; index < user.applicantsForPostedJobs.length; index++) {
                        const applicant = user.applicantsForPostedJobs[index];
                        
                        promises.push(new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/breif/info/applicant`, {
                                params: {
                                    applicantID: applicant.applicant
                                }
                            }).then((response) => {
                                if (response.data.message === "Located data!") {

                                    const { user } = response.data;

                                    applicant.firstName = user.firstName;
                                    applicant.lastName = user.lastName;
                                    applicant.accountType = user.accountType;
                                    applicant.username = user.username;
                                    applicant.profilePic = _.has(user, "profilePics") ? `${config.get("wasabi_url")}/${user.profilePics[user.profilePics.length - 1].picture}` : _.has(user, "photo") ? user.photo : config.get("no_image_avaliable"),
                                    applicant.profilePicType = _.has(user, "profilePics") ? user.profilePics[user.profilePics.length - 1].type : "picture";

                                    resolve(applicant);
                                } else {
                                    reject(null);
                                }
                            }).catch((errrrrr) => {
                                console.log(errrrrr);

                                reject(errrrrr);
                            })
                        }))
                    }

                    Promise.all(promises).then((passedValues) => {
                        res.json({
                            message: "Located applicants!",
                            applicants: passedValues
                        })
                    })
                } else {
                    res.json({
                        message: "NO applicants found..."
                    })
                }
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