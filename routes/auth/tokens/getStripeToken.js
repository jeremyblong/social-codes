const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        axios.post("https://stackoverflow.com/oauth", {}, {
            auth: {
                username: config.get("stackExchangeAPIclientID"),
                password: config.get("stackExchangeKey")
            },
            client_id: null
        }).then((response) => { 
            // const { access_token } = response.data;

            console.log("RESPONSE DATA", response.data);

            res.json({
                access_token,
                message: "Successfully gathered token and information!"
            })
        }).catch((err) => {
            console.log("ERROR", err);
        });
    });
});

module.exports = router;