const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, res) => {

        const { friend, id } = req.body;

        const database = db.db("db");

        const collection = database.collection("users");

        collection.findOne({ unique_id: id }).then((user) => {
            if (user) {
                
                if (user.friendRequests) {
                    for (let index = 0; index < user.friendRequests.length; index++) {
                        const request = user.friendRequests[index];
                        
                        if (friend.id === request.id) {
                            
                            user.friendRequests.splice(index, 1);

                            collection.save(user);
    
                            res.json({
                                message: "Denied friend!",
                                deleted: request
                            })
                        }
                    }
                } else {
                    res.json({
                        message: "No requests found!"
                    })
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