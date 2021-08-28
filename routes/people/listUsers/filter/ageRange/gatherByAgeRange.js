const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, resppppp) => {

        const { start, end } = req.query;

        const database = db.db("db");

        console.log(start, end);

        const collection = database.collection("users");

        const startDate =  new Date(`${end}-01-01`);
        const endDate = new Date(`${start}-01-01`);

        collection.find({ birthdate: { $gte: startDate, $lte: endDate } }).limit(100).toArray((err, users) => {
            if (err) {
                console.log(err);

                resppppp.json({
                    message: "Error locating users...",
                    err
                })
            } else {
                resppppp.json({
                    message: "Successfully located specific users!",
                    users
                })
            }
        })
    });
});

module.exports = router;