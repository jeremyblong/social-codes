const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const client = require('twilio')(config.get("twilioAccountSID"), config.get("twilioAuthToken"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { entryCode, phoneNumber } = req.body;

        console.log(req.body);

        client.verify.services(config.get("twilioServiceSID")).verificationChecks.create({ to: phoneNumber, code: entryCode }).then(verification_check => {

            console.log(verification_check.status);

            if (verification_check.status === "approved") {
                res.json({
                    message: "Successfully verified account!",
                    successful: true
                })
            } else {
                res.json({
                    message: "Unable to verify account with the provided code.",
                    successful: false
                })
            }
        });
    });
});

module.exports = router;