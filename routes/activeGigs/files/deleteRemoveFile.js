const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, respppppppp) => {

        const { id, file, otherUserID, passedID } = req.body;

        const database = db.db("db");

        console.log(req.body);

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [id, otherUserID ]}}).toArray((err, users) => {
            if (err) {
                respppppppp.json({
                    message: "ERROR occurred locating users...",
                    err
                })
            } else {

                const promise = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // signed in user
                        if (user.unique_id === id) {
                            for (let i = 0; i < user.activeHiredApplicants.length; i++) {
                                const applicant = user.activeHiredApplicants[i];
                                // check for matching applicant
                                if (applicant.id === passedID) {
                                    for (let iiiiii = 0; iiiiii < applicant.uploadedWork.length; iiiiii++) {
                                        const work = applicant.uploadedWork[iiiiii];

                                        console.log("work", work);
                                        // check for matching file
                                        if (work.id === file.id) {
                                            
                                            applicant.uploadedWork.splice(index, 1);

                                            collection.save(user, (err, result) => {
                                                if (err) {
                                                    console.log(err);

                                                    respppppppp.json({
                                                        message: "ERROR saving...",
                                                        err
                                                    })
                                                } else {
                                                    resolve(user);
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                })

                promise.then((passedUser) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // other user - client
                        if (user.unique_id === otherUserID) {
                            for (let i = 0; i < user.activeHiredApplicants.length; i++) {
                                const applicant = user.activeHiredApplicants[i];
                                // check for matching applicant
                                if (applicant.id === passedID) {
                                    for (let iiiiii = 0; iiiiii < applicant.uploadedWork.length; iiiiii++) {
                                        const work = applicant.uploadedWork[iiiiii];
                                        // check for matching file
                                        if (work.id === file.id) {
                                            applicant.uploadedWork.splice(index, 1);

                                            collection.save(user, (err, result) => {
                                                if (err) {
                                                    console.log(err);

                                                    respppppppp.json({
                                                        message: "ERROR saving...",
                                                        err
                                                    })
                                                } else {
                                                    respppppppp.json({
                                                        message: "Removed/deleted file!"
                                                    })
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;