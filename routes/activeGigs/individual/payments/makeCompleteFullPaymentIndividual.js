const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { 
            rate,
            id,
            date,
            jobID,
            otherUserID 
        } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.find({ unique_id: { $in: [ otherUserID, id ]}}).toArray((err, users) => {
            if (err) {
                console.log(err);

                res.json({
                    message: "An error occurred while fetching users to update",
                    err
                })
            } else {

                const promise = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // signed in user
                        if (user.unique_id === id) {
                            
                        }
                    }
                })

                promise.then((passedData) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        // other user
                        if (user.unique_id === otherUserID) {
                            


                            res.json({
                                message: "Made COMPLETE payment!"
                            })
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;