const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const { id, passedID } = req.query;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ "activeHiredApplicants.id": passedID }).then((user) => {
            if (user) {
                console.log(user);

                for (let index = 0; index < user.activeHiredApplicants.length; index++) {
                    const applicant = user.activeHiredApplicants[index];
                    // check for matching application
                    if (applicant.id === passedID) {
                        res.json({
                            message: "Gathered data!",
                            application: applicant
                        })
                    }
                }
            } else {
                res.json({
                    message: "Could not locate user with matching id..."
                })
            }
        }).catch((err) => {
            console.log("ERR:", err);
        })
    });
});

module.exports = router;