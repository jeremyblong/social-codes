const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id, related } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }, { fields: { activeInterviews: 1 }}).then((user) => {
            if (user) {

                if (typeof user.activeInterviews !== "undefined" && user.activeInterviews.length > 0) {
                    for (let index = 0; index < user.activeInterviews.length; index++) {
                        const interview = user.activeInterviews[index];
                        
                        if (interview.jobID === related) {
                            res.json({
                                message: "Ran logic!",
                                bool: true
                            })       
                        }
                    }
                } else {
                    res.json({
                        message: "Ran logic!",
                        bool: false
                    })
                }
            } else {
                res.json({
                    message: "Could NOT locate user..."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);

            res.json({
                err,
                message: "Critical error occurred..."
            })
        })
    });
});

module.exports = router;