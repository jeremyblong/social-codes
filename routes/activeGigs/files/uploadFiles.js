const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint(config.get("wasabiEndpoint"));
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const multer = require('multer');
const multerS3 = require('multer-s3');
const _ = require("lodash");
const axios = require("axios");


const accessKeyId = config.get("wasabiAccessKey");
const secretAccessKey = config.get("wasabiSecretAccessKey");

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: config.get("wasabiRegion"),
	accessKeyId,
	secretAccessKey
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.get("wasabiBucket"),
        key: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname); 
        }
    })
});

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", upload.array("files"), (req, resppppppppp) => {

        const { id, otherUser, passedID, activeHiredID, fullName, jobID, note } = req.body;

        const links = JSON.parse(req.body.links);

        console.log(req.files);

        console.log(req.body);

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [id, otherUser ]}}).toArray((err, users) => {
            if (err) {
                resppppppppp.json({
                    message: "ERROR occurred locating users...",
                    err
                })
            } else {

                console.log("else ran...")

                let fileArray = [];
                
                if (typeof req.files !== "undefined" && req.files.length > 0) {
                    const { files } = req;

                    for (let i = 0; i < files.length; i++) {
                        const file = files[i];

                        fileArray.push({
                            fullUri: file.location,
                            fileName: file.originalname,
                            type: file.mimetype,
                            id: uuidv4()
                        })
                    }
                }

                const promise = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // logged in user - freelancer
                        if (user.unique_id === id) {
                            for (let indexxxx = 0; indexxxx < user.activeHiredApplicants.length; indexxxx++) {
                                const applicant = user.activeHiredApplicants[indexxxx];
                                
                                if (applicant.id === passedID) {
                                    if (_.has(applicant, "uploadedWork")) {
                                        applicant.uploadedWork.push(...fileArray);
                                    } else {
                                        applicant["uploadedWork"] = fileArray;
                                    }

                                    if (typeof note !== "undefined" && note.length > 0) {
                                        if (_.has(applicant, "note")) {
                                            applicant.note = note;
                                        } else {
                                            applicant["note"] = note;
                                        }
                                    }
                                    if (typeof links !== "undefined" && links.length > 0) {
                                        if (_.has(applicant, "links")) {
                                            applicant.links = [...applicant.links, ...links];
                                        } else {
                                            applicant["links"] = links;
                                        }
                                    }
                                }

                                if ((user.activeHiredApplicants.length - 1) === index) {
                                    console.log("last...")
                                    collection.save(user, (err, result) => {
                                        if (err) {
                                            console.log(err);

                                            resppppppppp.json({
                                                message: "ERROR occurred while saving user information."
                                            })
                                        } else {
                                            console.log("Resolve....");
                                            resolve(user);
                                        }
                                    })
                                }
                            }
                        }
                    }
                })

                promise.then((passedUser) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // other user - client
                        if (user.unique_id === otherUser) {
                            for (let indexxxx = 0; indexxxx < user.activeHiredApplicants.length; indexxxx++) {
                                const applicant = user.activeHiredApplicants[indexxxx];
                                
                                if (applicant.id === passedID) {
                                    if (_.has(applicant, "uploadedWork")) {
                                        applicant.uploadedWork.push(...fileArray);
                                    } else {
                                        applicant["uploadedWork"] = fileArray;
                                    }

                                    if (typeof note !== "undefined" && note.length > 0) {
                                        if (_.has(applicant, "note")) {
                                            applicant.note = note;
                                        } else {
                                            applicant["note"] = note;
                                        }
                                    }
                                    if (typeof links !== "undefined" && links.length > 0) {
                                        if (_.has(applicant, "links")) {
                                            applicant.links = [...applicant.links, ...links];
                                        } else {
                                            applicant["links"] = links;
                                        }
                                    }
                                }
                            }
                            const configgg = {
                                headers: {
                                    "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                                    "Content-Type": "application/json"
                                }
                            }
            
                            const notification_addition = {
                                id: uuidv4(),
                                system_date: Date.now(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                data: {
                                    title: `${fullName} has submitted project files for an active pending job...!`,
                                    body: `${fullName} has submitted a file(s) for your active project pending completion, check out the uploaded work from your freelancer now!`,
                                    data: {
                                        jobID,
                                        with: id,
                                        id: activeHiredID
                                    }
                                },
                                from: user.unique_id,
                                link: "files-pending-project",

                            };
            
                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                "to": user.firebasePushNotificationToken,
                                "notification": {
                                    "title": `${fullName} has submitted project files for an active pending job...!`,
                                    "body": `${fullName} has submitted a file(s) for your active project pending completion, check out the uploaded work from your freelancer now!`,
                                    "mutable_content": true,
                                    "sound": "Tri-tone"
                                },
                                "data": {
                                    // use company logo 
                                    "url": `${config.get("logoImage")}`,
                                    "dl": "notifications"
                                    // use company logo ^^^^^^^^^^^^^^^^^^^^^^^^^
                                }
                            }, configgg).then((res) => {
    
                                console.log("RES", res.data);
            
                                if (user.notifications) {
                                    user.notifications.push(notification_addition);
                                } else {
                                    user["notifications"] = [notification_addition];
                                }

                                collection.save(user, (err, result) => {
                                    if (err) {
                                        console.log("err occurred while saving db info", err);
                                    } else {
                                        resppppppppp.json({
                                            message: "Uploaded Files!",
                                            files: fileArray
                                        })
                                    }
                                });
            
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;