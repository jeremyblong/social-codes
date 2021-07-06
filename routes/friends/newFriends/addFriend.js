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

        collection.find({ unique_id: { $in: [ friend.requestee, id ] } }).toArray((err, users) => {

            if (users) {

                const generated = uuidv4();

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        
                        if (user.unique_id === id) {
                            // signed in user

                            if (user.friendRequests) {
                                for (let index = 0; index < user.friendRequests.length; index++) {
                                    const request = user.friendRequests[index];
                                    
                                    if (friend.id === request.id) {
                                        
                                        user.friendRequests.splice(index, 1);
            
                                        const newRequest = {
                                            id: generated,
                                            date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                            systemDate: Date.now(),
                                            acquaintance: request.requesteeName,
                                            acquaintanceID: request.requestee,
                                            acquaintanceUsername: request.otherUserUsername
                                        };
            
                                        if (user.acceptedFriendRequests) {
                                            user.acceptedFriendRequests.push(newRequest);
                                        } else {
                                            user["acceptedFriendRequests"] = [newRequest];
                                        }
            
                                        collection.save(user);

                                        resolve({
                                            user,
                                            request
                                        });
                                    }
                                }
                            } else {
                                resolve(null);
                            }
                        }
                    }
                })

                promiseee.then((passed) => {
                    for (let index = 0; index < users.length; index++) {
                        const user = users[index];
                        
                        if (user.unique_id === friend.requestee) {
                            // other user

                            for (let index = 0; index < user.sentFriendRequests.length; index++) {
                                const action = user.sentFriendRequests[index];
                                console.log("Action:", action);
                                
                                if (action.id === passed.request.id) {
                                    console.log("MATCH");

                                    user.sentFriendRequests.splice(index, 1);

                                }
                            }

                            const newRequest = {
                                id: generated,
                                date: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                systemDate: Date.now(),
                                acquaintance: `${passed.user.firstName} ${passed.user.lastName}`,
                                acquaintanceID: passed.user.unique_id,
                                acquaintanceUsername: passed.user.username
                            };

                            if (user.acceptedFriendRequests) {
                                user.acceptedFriendRequests.push(newRequest);
                            } else {
                                user["acceptedFriendRequests"] = [newRequest];
                            }

                            collection.save(user);
    
                            res.json({
                                message: "Added friend!",
                                deleted: passed.request
                            })
                        }
                    }
                })
            } else {
                console.log(err);

                res.json({
                    err
                })
            }
        });
    });
});

module.exports = router;