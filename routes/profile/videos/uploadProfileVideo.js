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

const upload = multer({ dest: 'uploads/' });

const accessKeyId = config.get("wasabiAccessKey");
const secretAccessKey = config.get("wasabiSecretAccessKey");

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: config.get("wasabiRegion"),
	accessKeyId,
	secretAccessKey
});

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", upload.single("video"), (req, res) => {
 
        const database = db.db("db");

        const collection = database.collection("users");

        const { video64, unique_id } = req.body;

        collection.findOne({ unique_id }).then((user) => {
            if (user) {
                
                const generatedID = uuidv4();

                const bufferImage = Buffer.from(video64, "base64");

                s3.putObject({
                    Body: bufferImage,
                    Bucket: config.get("wasabiBucket"),
                    Key: generatedID,
                    ContentEncoding: 'base64',
                    ContentType: "video/mp4"
                }, (errorr, dataaa) => {
                    if (errorr) {
                        console.log(errorr);
                    }
                    console.log(dataaa);

                    if (user.profilePics) {
                        user.profilePics.push({
                            id: uuidv4(),
                            picture: generatedID,
                            type: "video",
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            systemDate: Date.now()
                        })
                    } else {
                        user["profilePics"] = [{
                            id: uuidv4(),
                            picture: generatedID,
                            type: "video",
                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                            systemDate: Date.now()
                        }]
                    }

                    collection.save(user);

                    res.json({
                        message: "Uploaded video!",
                        generatedID
                    })
                });
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