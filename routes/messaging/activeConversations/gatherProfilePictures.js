const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, response) => {

        const database = db.db("db");

        const collection = database.collection("users");

        const { 
            conversationList
        } = req.body;

        collection.find({}).toArray((err, users) => {
            if (err) {
                console.log(err);

                response.json({
                    err,
                    message: "Could not find users, error occurred."
                })
            } else {
                const convos = [];
                for (let index = 0; index < users.length; index++) {
                    const userrr = users[index];
                    
                    for (let i = 0; i < conversationList.length; i++) {
                        const convo = conversationList[i];
                        
                        if (userrr.unique_id === convo.conversationWith.uid) {
                            if (typeof userrr.profilePics !== 'undefined' && userrr.profilePics.length > 0) {
                                convo.profilePic = userrr.profilePics[userrr.profilePics.length - 1];
                            } else {
                                convo.profilePic = {
                                    id: uuidv4(),
                                    picture: "no-image-available.jpeg",
                                    type: "picture",
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    systemDate: Date.now()
                                }
                            }
                            
                            convos.push(convo);
                        }
                    }
                }
                response.json({
                    message: "Success!",
                    convos
                })
            }
        })
    });
});

module.exports = router;