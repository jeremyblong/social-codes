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

        const { 
            id,
            base64,
            type
        } = req.body;

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                
                const generatedID = uuidv4();

                let bufferrr = Buffer.from(base64, 'base64')

                s3.putObject({
                    Body: bufferrr,
                    Bucket: config.get("wasabiBucket"),
                    Key: generatedID,
                    ContentEncoding: 'base64',
                    ContentType: type
                }, (errorr, dataaa) => {
                    if (errorr) {
                        console.log(errorr);
                    }
                    console.log(dataaa);

                    res.json({
                        message: "Successfully uploaded content!",
                        generatedID
                    })
                });
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