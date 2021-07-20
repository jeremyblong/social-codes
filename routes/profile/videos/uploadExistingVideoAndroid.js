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
    router.post("/", upload.single("video"), (req, res) => {
 
        const database = db.db("db");

        const collection = database.collection("users");

        const { unique_id } = req.body;

        console.log(req.files, req.file);

        collection.findOne({ unique_id }).then((user) => {
            if (user) {
                
                console.log(user);
                
                const new_data = {
                    id: uuidv4(),
                    picture: req.file.originalname,
                    type: "video",
                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    systemDate: Date.now()
                };

                if (user.profilePics) {
                    user.profilePics.push(new_data);
                } else {
                    user["profilePics"] = [new_data];
                }

                collection.save(user);

                res.json({
                    message: "Uploaded video!",
                    profilePic: new_data
                })
            } else {
                res.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log("CRITICAL ERR: ", err);

            if (err === "PayloadTooLargeError: request entity too large") {
                res.json({
                    err
                })
            }
        })
    });
});

module.exports = router;