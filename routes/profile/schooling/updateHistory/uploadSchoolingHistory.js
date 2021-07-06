const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { 
            schoolName,   
            startDate,
            endDate,
            degree,
            areaOfStudy,
            description,
            unique_id 
        } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id }).then((user) => {
            if (user) {
                
                const newSchoolData = {
                    schoolName: schoolName,   
                    startDate: startDate !== null ? startDate : null,
                    endDate: endDate !== null ? endDate : null,
                    degree: degree !== null ? degree : null,
                    areaOfStudy: typeof areaOfStudy !== "undefined" && areaOfStudy.length > 0 ? areaOfStudy : null,
                    description: typeof description !== "undefined" && description.length > 0 ? description : null,
                    id: uuidv4(),
                    poster: unique_id
                }

                if (user.schoolingHistory) {
                    user.schoolingHistory.push(newSchoolData);
                } else {
                    user["schoolingHistory"] = [newSchoolData];
                };

                collection.save(user);

                res.json({
                    message: "Uploaded new schooling history!",
                    schooling: user.schoolingHistory
                })
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