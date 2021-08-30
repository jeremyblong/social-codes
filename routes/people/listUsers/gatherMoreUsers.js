const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');



mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.get("/", (req, res) => {

        const database = db.db("db");

        const { alreadyPooled } = req.query;

        const collection = database.collection("users");

        console.log(req.query);

        if (typeof alreadyPooled !== "undefined" && alreadyPooled.length > 0) {
            collection.aggregate(
                [
                    { $match: { unique_id: { $nin: alreadyPooled }}},
                    { $sample: { size: 10 } },
                    { $project: {
                        "loginPassword": 0,
                        "cometChatAuthToken": 0,  
                        "phoneNumber": 0,
                        "loginEmail": 0,
                        "loginUsername": 0,
                        "userCurrentLocation": 0,
                        "stripeCustomerAccount": 0,
                        "skillsApiToken": 0,
                        "firebasePushNotificationToken": 0,
                        "twilioJWTAuthToken": 0,
                        "sentFriendRequests": 0,
                        "pendingInterviews": 0,
                        "cardPaymentMethods": 0
                    }}
                ]
            ).limit(10).toArray((err, people) => {
                if (err) {
                    console.log(err);
    
                    res.json({
                        message: "Critical error while gathering people!",
                        err
                    })
                } else {
                    console.log("people: ", people);
    
                    const persons = [];
    
                    if (typeof people !== "undefined" && people.length > 0) {
                        for (let index = 0; index < people.length; index++) {
                            const person = people[index];
                            
                            persons.push(person.unique_id);
        
                            if ((people.length - 1) === index) {
                                res.json({
                                    message: "Successfully located people!",
                                    people,
                                    persons
                                })    
                            }
                        }
                    } else {
                        res.json({
                            message: "Successfully located people!",
                            people: [],
                            persons
                        })  
                    }
                }
            });
        } else {
            res.json({
                message: "Successfully located people!",
                people: [],
                persons: []
            }) 
        }
    });
});

module.exports = router;


// { fields : { 
//     loginPassword: 0,
//     cometChatAuthToken: 0,  
//     phoneNumber: 0,
//     loginEmail: 0,
//     loginUsername: 0
// }}