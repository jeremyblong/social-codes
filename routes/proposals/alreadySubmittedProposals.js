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

        collection.findOne({ unique_id: id }, { fields: { appliedJobsAlready: 1, profilePics: 1, photo: 1 }}).then((user) => {
            if (user) {
                console.log(user);

                const promises = [];

                if (typeof user.appliedJobsAlready !== "undefined" && user.appliedJobsAlready.length > 0) {
                    for (let index = 0; index < user.appliedJobsAlready.length; index++) {
                        const element = user.appliedJobsAlready[index];
                        
                        promises.push(new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/proposal/info`, {
                                params: {
                                    jobID: element.jobID
                                }
                            }).then((response) => {
        
                                if (response.data.message === "Successfully located listing!") {
    
                                    const { job } = response.data;
    
                                    element.jobData = job;
        
                                    resolve(element);
                                } else {
                                    console.log("err", response.data);
        
                                    reject();
                                }
                            }).catch((err) => {
                                console.log(err);
        
                                reject(err);
                            })
                        }));
                    }
    
                    Promise.all(promises).then((values) => {
                        res.json({
                            message: "Successfully gathered proposals!",
                            user,
                            values
                        })
                    })
                } else {
                    res.json({
                        message: "Successfully gathered proposals!",
                        user,
                        values: []
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