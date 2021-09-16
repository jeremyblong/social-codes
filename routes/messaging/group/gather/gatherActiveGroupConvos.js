const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const fetch = require("node-fetch");

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", (req, response) => {

        const database = db.db("db");

        const collection = database.collection("users");

        const { 
            conversationList
        } = req.body;

        console.log(conversationList);

        const conversations = [];
        
        for (let i = 0; i < conversationList.length; i++) {
            const convooooo = conversationList[i];
            conversations.push(convooooo.owner);
        }

        collection.find({ unique_id: { $in: conversations }}).toArray((err, users) => {
            if (err) {
                console.log(err);

                response.json({
                    err,
                    message: "Could not find users, error occurred."
                })
            } else {
                const convos = [];
                
                const promiseeee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const userrr = users[index];
                        
                        for (let i = 0; i < conversationList.length; i++) {
                            const connnnnversation = conversationList[i];
                            
                            if (typeof userrr.profilePics !== 'undefined' && userrr.profilePics.length > 0) {
                                connnnnversation.profilePic = userrr.profilePics[userrr.profilePics.length - 1];
                            } else {
                                connnnnversation.profilePic = {
                                    id: uuidv4(),
                                    picture: "no-image-available.jpeg",
                                    type: "picture",
                                    date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    systemDate: Date.now()
                                }
                            }
                            
                            convos.push(connnnnversation);
                        }
                        if ((users.length - 1) === index) {
                            resolve(convos);
                        }
                    }
                })

                promiseeee.then((passedValues) => {
                    response.json({
                        message: "Success!",
                        convos: passedValues
                    })
                })  
            }
        })
    });
});

module.exports = router;