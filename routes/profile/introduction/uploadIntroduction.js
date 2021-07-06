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
            cb(null, file.originalname);
        }
    })
});

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", upload.single("video"), (req, res) => {
 
        const database = db.db("db");

        const collection = database.collection("users");

        const { unique_id, picture_id } = req.body;

        console.log(req.file, req.files);

        console.log(req.body);

        collection.findOne({ unique_id }).then((user) => {
            if (user) {
                
                if (user.introductionVideo) {
                    user.introductionVideo = picture_id;
                } else {
                    user["introductionVideo"] = picture_id;
                }

                collection.save(user);

                res.json({
                    message: "Uploaded video!",
                    generatedID: picture_id
                })
            } else {
                res.json({
                    message: "Could not locate the appropriate user..."
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;