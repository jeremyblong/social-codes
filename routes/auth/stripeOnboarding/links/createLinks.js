const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", async (req, res) => {

        const { stripeConnectAccountID } = req.query;

        await stripe.accountLinks.create({
            account: stripeConnectAccountID,
            refresh_url: 'https://www.google.com',
            return_url: 'https://www.google.com',
            type: 'account_onboarding',
        }).then((links) => {
            console.log("links", links);

            res.json({
                message: "Created links!",
                url: links.url
            })
        }).catch((err) => {
            console.log("Critical error...", err);
        });
    });
});

module.exports = router;