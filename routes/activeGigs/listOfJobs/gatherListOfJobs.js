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

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                const promises = [];

                if (typeof user.activeHiredApplicants !== "undefined" && user.activeHiredApplicants.length > 0) {
                    for (let index = 0; index < user.activeHiredApplicants.length; index++) {
                        const applicant = user.activeHiredApplicants[index];
                        
                        promises.push(new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/user/pics/only`, {
                                params: {
                                    id: applicant.with
                                }
                            }).then((res) => {
 
                                const { photo, type } = res.data;

                                applicant.photo = photo;
                                applicant.type = type;

                                resolve(applicant);
                            }).catch((err) => {
                                console.log(err);

                                reject(err);
                            })
                        }))
                    }

                    Promise.all(promises).then((passedValues) => {
                        res.json({
                            message: "Gathered active jobs!",
                            activeHiredApplicants: passedValues
                        })
                    })
                } else {
                    res.json({
                        message: "Gathered active jobs!",
                        activeHiredApplicants: []
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