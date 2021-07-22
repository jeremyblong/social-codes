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

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                for (let index = 0; index < user.activeHiredApplicants.length; index++) {
                    const applicant = user.activeHiredApplicants[index];
                    
                    if (applicant.id === passedID) {
                        res.json({
                            message: "Gathered files!",
                            files: [...applicant.uploadedWork]
                        })
                    }
                }
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