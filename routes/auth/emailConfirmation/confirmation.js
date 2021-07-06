const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { code, entered } = req.body;

        console.log(code, entered);

        if (code === entered) {
            res.json({
                message: "Code matches!"
            })
        } else {
            res.json({
                message: "Code does NOT match."
            })
        }
    });
});

module.exports = router;