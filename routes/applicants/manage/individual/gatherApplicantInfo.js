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

        const { applicants } = req.body;

        const promises = [];

        if (typeof applicants !== "undefined" && applicants.length > 0) {
            for (let index = 0; index < applicants.length; index++) {
                const applicant = applicants[index];
                
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
                            applicant.unique_id = user.unique_id;

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
                    message: "Gathered applicant info!",
                    applicants: passedValues
                })
            })
        } else {
            res.json({
                message: "NO applicants found..."
            })
        }
    });
});

module.exports = router;