const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const client = require('twilio')(config.get("twilioAccountSID"), config.get("twilioAuthToken"));



mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { phoneNumber, formatted, countryCode } = req.body;

        console.log(phoneNumber, formatted, countryCode);

        const email = req.body.email.trim();

        if (countryCode === "US") {

            client.verify.services(config.get("twilioServiceSID")).verifications.create({ to: formatted, channel: 'sms' }).then(verification => {
                console.log(verification.status);

                res.json({
                    message: "Successfully sent message to cellular device!",
                    verifyPhoneNumber: formatted
                })
            }).catch(error => {
                console.log(error);
            });
        } else {
            client.verify.services(config.get("twilioServiceSID")).verifications.create({ to: formatted, channel: 'sms' }).then(verification => {
                console.log(verification.status);

                res.json({
                    message: "Successfully sent message to cellular device!",
                    verifyPhoneNumber: formatted
                })
            }).catch(error => {
                console.log(error);
            });
        }
    });
});

module.exports = router;