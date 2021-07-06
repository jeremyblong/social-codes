const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.put("/", (req, res) => {

        const { id, selected } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {

                for (let index = 0; index < user.schoolingHistory.length; index++) {
                    const school = user.schoolingHistory[index];
                    
                    if (school.id === selected.id) {
                        user.schoolingHistory.splice(index, 1);

                        collection.save(user);

                        res.json({
                            message: "Deleted education record!",
                            history: user.schoolingHistory
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