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
const aws = require('aws-sdk');
const axios = require("axios");

const accessKeyId = config.get("wasabiAccessKey");
const secretAccessKey = config.get("wasabiSecretAccessKey");

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: config.get("wasabiRegion"),
	accessKeyId,
	secretAccessKey
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.get("wasabiBucket"),
        key: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", upload.array('pictures', 10), (req, resppppppp) => {

        const { text, id, visibility, taggedUsers, username, fullName, selection, prep } = req.body;

        const decoded = JSON.parse(taggedUsers);
        const tagged = JSON.parse(taggedUsers);
        const parsedPrep = JSON.parse(prep);

        let selectionParsed;

        if (typeof selection !== "undefined" && selection !== null) {
            selectionParsed = JSON.parse(selection);
        } else {
            selectionParsed = {};
        }

        console.log(req.body);

        decoded.push(username);

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ username: { $in: decoded }}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "Critical error occurred...could not locate any users.",
                    err
                })
            } else {
                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // signed in user
                        if (user.unique_id === id) {
    
                            const pictureArray = [];
    
                            if (typeof req.files !== "undefined" && req.files.length > 0) {
                                for (let index = 0; index < req.files.length; index++) {
                                    const file = req.files[index];
                                    
                                    pictureArray.push(file.originalname);
                
                                    if ((req.files.length - 1) === index) {
                                        const newWallPost = {
                                            id: uuidv4(),
                                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            systemDate: Date.now(),
                                            text,
                                            pictures: pictureArray,
                                            visibility,
                                            poster: id,
                                            reactions: {
                                                screaming: 0,
                                                exploding: 0,
                                                tearsOfJoy: 0,
                                                clapping: 0,
                                                angry: 0,
                                                heart: 0,
                                                wow: 0
                                            },
                                            shared: false,
                                            except: [],
                                            peopleReacted: [],
                                            peopleReactedIDs: [],
                                            taggedUsers: tagged.length > 0 ? tagged : null,
                                            taggedLocation: Object.keys(selectionParsed).length > 0 ? true : false,
                                            taggedLocationData: Object.keys(selectionParsed).length > 0 ? selectionParsed : null,
                                            videoLink: parsedPrep !== null ? prep.replace(/"|'/g, '') : null,
                                            videoLinkIncluded: parsedPrep !== null ? true : false
                                        };
                        
                                        if (user.wallPosts) {
                                            user.wallPosts.push(newWallPost);
                                        } else {
                                            user["wallPosts"] = [newWallPost];
                                        }
                        
                                        collection.save(user);
                        
                                        resolve();
                                    }
                                }
                            } else {
                                const newWallPost = {
                                    id: uuidv4(),
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    systemDate: Date.now(),
                                    text,
                                    pictures: null,
                                    visibility,
                                    poster: id,
                                    reactions: {
                                        screaming: 0,
                                        exploding: 0,
                                        tearsOfJoy: 0,
                                        clapping: 0,
                                        angry: 0,
                                        heart: 0,
                                        wow: 0
                                    },
                                    shared: false,
                                    except: [],
                                    peopleReacted: [],
                                    peopleReactedIDs: [],
                                    taggedUsers: tagged.length > 0 ? tagged : null,
                                    taggedLocation: Object.keys(selectionParsed).length > 0 ? true : false,
                                    taggedLocationData: Object.keys(selectionParsed).length > 0 ? selectionParsed : null,
                                    videoLink: parsedPrep !== null ? prep.replace(/"|'/g, '') : null,
                                    videoLinkIncluded: parsedPrep !== null ? true : false
                                };
                
                                if (user.wallPosts) {
                                    user.wallPosts.push(newWallPost);
                                } else {
                                    user["wallPosts"] = [newWallPost];
                                }
                
                                collection.save(user);
                
                                resolve();
                            }
                        }
                    }
                })

                promiseee.then(() => {

                    const configgg = {
                        headers: {
                            "Authorization": `key=${config.get("firebaseCloudMessagingServerKey")}`,
                            "Content-Type": "application/json"
                        }
                    }

                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        
                        if (decoded.includes(user.username) && user.username !== username) {
                            console.log("USER", user);
            
                            const nofitication_addition = {
                                id: uuidv4(),
                                system_date: Date.now(),
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                data: {
                                    title: `${fullName} tagged you in a wall posting on their feed!`,
                                    body: `${fullName} has included you in a wall posting status update, go to their profile to check out what they said!`
                                },
                                from: id,
                                link: "notifications"
                            };
            
                            axios.post("https://fcm.googleapis.com/fcm/send", {
                                "to": user.firebasePushNotificationToken,
                                "notification": {
                                    "title": `${fullName} tagged you in a wall posting on their feed!`,
                                    "body": `${fullName} has included you in a wall posting status update, go to their profile to check out what they said!`,
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
                                    user.notifications.push(nofitication_addition);
                                } else {
                                    user["notifications"] = [nofitication_addition];
                                }
                                
                                collection.save(user);
    
                                if ((users.length - 1) === index) {
                                    resppppppp.json({
                                        message: "Posted wall post!"
                                    })
                                }
            
                            }).catch((err) => {
                                console.log(err);

                                if ((users.length - 1) === index) {
                                    resppppppp.json({
                                        message: "Posted wall post!"
                                    })
                                }
                            })
                        } else {
                            if ((users.length - 1) === index) {
                                resppppppp.json({
                                    message: "Posted wall post!"
                                })
                            }
                        }
                    }
                })
            }
        });
    });
});

module.exports = router;