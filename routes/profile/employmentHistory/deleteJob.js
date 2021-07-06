const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { id, selectedToDelete } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                console.log(user);

                for (let index = 0; index < user.employmentHistory.length; index++) {
                    const job = user.employmentHistory[index];
                    
                    if (job.id === selectedToDelete.id) {

                        user.employmentHistory.splice(index, 1);

                        collection.save(user);

                        res.json({
                            message: "Deleted!",
                            user    
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