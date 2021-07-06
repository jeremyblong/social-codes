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

const accessKeyId = config.get("wasabiAccessKey");
const secretAccessKey = config.get("wasabiSecretAccessKey");

const s3 = new S3({
	endpoint: wasabiEndpoint,
	region: config.get("wasabiRegion"),
	accessKeyId,
	secretAccessKey
});

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("db");

        const collection = database.collection("users");

        const { unique_id, base64 } = req.body;

        collection.findOne({ unique_id }).then((user) => {
            if (user) {

                const generatedID = uuidv4();

                const bufferImage = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""),'base64');

                s3.putObject({
                    Body: bufferImage,
                    Bucket: config.get("wasabiBucket"),
                    Key: generatedID,
                    ContentEncoding: 'base64'
                }, (errorr, dataaa) => {
                    if (errorr) {
                        console.log(errorr);
                    }
                    console.log(dataaa);

                    const new_data = {
                        id: uuidv4(),
                        picture: generatedID,
                        date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                        systemDate: Date.now(),
                        type: "picture"
                    };

                    if (user.profilePics) {
                        user.profilePics.push(new_data);
                    } else {
                        user["profilePics"] = [new_data];
                    }

                    collection.save(user);

                    res.json({
                        message: "Uploaded photo!",
                        picture: new_data
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