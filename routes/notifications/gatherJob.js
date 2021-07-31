const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, respppppppp) => {

        const { withWho, jobID, id } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                for (let index = 0; index < user.activeHiredApplicants.length; index++) {
                    const applicant = user.activeHiredApplicants[index];
                    // check if job and applicant match
                    if (applicant.jobID === jobID && applicant.with === withWho) {

                        axios.get(`${config.get("ngrok_url")}/gather/user/pics/only`, {
                            params: {
                                id: applicant.with
                            }
                        }).then((res) => {

                            const { photo, type } = res.data;

                            applicant.photo = photo;
                            applicant.type = type;

                            respppppppp.json({
                                message: "Successfully gathered more info!",
                                item: applicant
                            });  
                        }).catch((err) => {
                            console.log(err);

                            reject(err);
                        })     
                    }
                }
            } else {
                respppppppp.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;