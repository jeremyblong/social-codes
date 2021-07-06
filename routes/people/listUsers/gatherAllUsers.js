const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({}, { fields : { 
            loginPassword: 0,
            cometChatAuthToken: 0,  
            phoneNumber: 0,
            loginEmail: 0,
            loginUsername: 0,
            userCurrentLocation: 0,
            stripeCustomerAccount: 0,
            skillsApiToken: 0,
            firebasePushNotificationToken: 0,
            twilioJWTAuthToken: 0,
            sentFriendRequests: 0,
            pendingInterviews: 0,
            cardPaymentMethods: 0
        }}).limit(8).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    err,
                    message: "Could not find users, error occurred."
                })
            } else {
                res.json({
                    message: "Gathered all users!",
                    users
                })
            }
        })
    });
});

module.exports = router;