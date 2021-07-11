const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {
                console.log(user);

                const paymentMethods = await stripe.paymentMethods.list({
                    customer: user.stripeCustomerAccount.id,
                    type: 'card',
                }).then((cards) => {
                    console.log(cards);

                    if (cards.data.length > 0) {
                        res.json({
                            message: "User HAS REGISTERED a card already!"
                        })
                    } else {
                        res.json({
                            message: "User has NOT registered a card yet..."
                        })
                    }
                }).catch((err) => {
                    res.json({
                        err,
                        message: "Error occurred while gathering card information..."
                    })
                });
               
            } else {
                res.json({
                    message: "User could NOT be found."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;