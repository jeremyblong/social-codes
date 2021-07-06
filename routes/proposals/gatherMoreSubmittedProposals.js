const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("db");

        const { alreadyPooled, id } = req.body;

        const collection = database.collection("users");

        const alreadyUsedIDS = [];

        collection.findOne({ 'appliedJobsAlready.id': { $nin: alreadyPooled.filter(doc => {

            if (!alreadyPooled.includes(doc)) {
                return doc;    
            }
        })}}).then((user) => {
            console.log("USER:", user);

            const promises = [];

            if (typeof user.appliedJobsAlready !== 'undefined' && user.appliedJobsAlready.length > 0) {
                for (let iiiiii = 0; iiiiii < user.appliedJobsAlready.length; iiiiii++) {
                    let element = user.appliedJobsAlready[iiiiii];
                    
                    if (!alreadyPooled.includes(element.id)) {
                        const element = user.appliedJobsAlready[iiiiii];
                    
                        promises.push(new Promise((resolve, reject) => {
                            axios.get(`${config.get("ngrok_url")}/gather/proposal/info`, {
                                params: {
                                    jobID: element.jobID
                                }
                            }).then((response) => {
        
                                if (response.data.message === "Successfully located listing!") {
        
                                    const { job } = response.data;
        
                                    element.jobData = job;
        
                                    alreadyUsedIDS.push(element.id);
        
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
                }
    
                Promise.all(promises).then((myValues) => {

                    console.log("alreadyUsedIDS", alreadyUsedIDS);
    
                    res.json({
                        message: "Successfully gathered more!",
                        proposals: myValues,
                        ids: alreadyUsedIDS
                    })
                })
            } else {
                res.json({
                    message: "Successfully gathered more!",
                    proposals: [],
                    ids: alreadyUsedIDS
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;