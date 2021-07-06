const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const database = db.db("db");

        const collection = database.collection("users");

        const { id, paypal_email } = req.body;

        collection.update({ unique_id: id }, { $unset : { paypalPaymentAddress : paypal_email } }, (err, results) => {
            if (err) {
                console.log(err);

                res.json({
                    err
                })
            } else {

                res.json({
                    message: "Deleted paypal account!"
                })
            }
        });
    });
});

module.exports = router;