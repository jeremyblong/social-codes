const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { decrypt } = require("../../../../../crypto.js");
const stripe = require('stripe')(config.get("stripeSecretKey"));


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("db");

        const collection = database.collection("users");

        const { id, card } = req.body;

        console.log(card);

        collection.findOne({ unique_id: id }).then(async (user) => {
            if (user) {

                for (let index = 0; index < user.cardPaymentMethods.length; index++) {
                    const individual = user.cardPaymentMethods[index];
                    if (decrypt(individual.card_number) === decrypt(card.card_number)) {

                        const deleted = await stripe.customers.deleteSource(user.stripeCustomerAccount.id, individual.token.card.id);

                        if (deleted) {
                            user.cardPaymentMethods.splice(index, 1);

                            collection.save(user);

                            res.json({
                                message: "Successfully deleted the desired card!",
                                cards: user.cardPaymentMethods
                            })
                        }
                    }
                }
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