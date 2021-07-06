const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { email } = req.body;

        const lowerEmail = email.toLowerCase();

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ loginEmail: lowerEmail }).then((user) => {
            if (user) {
                
                console.log(user);

                res.json({
                    message: "Email is NOT avaliable!"
                })
            } else {
                res.json({
                    message: "Email is avaliable!"
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    });
});

module.exports = router;