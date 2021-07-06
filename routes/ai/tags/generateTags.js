const express = require("express");
const router = express.Router();
const app = express();
const mongo = require("mongodb");
const config = require("config");
const cors = require('cors');
const axios = require("axios");
const language = require('@google-cloud/language');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
    router.post("/", async (req, res) => {

        const { text } = req.body;

        // Creates a client
        const client = new language.LanguageServiceClient();

        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };
        
        // Detects entities in the document
        const [result] = await client.analyzeEntities({document});
        
        const entities = result.entities;

        const entityArray = [];
        
        console.log('Entities:');
        
        entities.forEach(entity => {
            console.log(entity.name);
            if (!entityArray.includes(entity.name)) {
               entityArray.push(entity.name); 
            }
        });

        res.json({
            message: "Generated tags!",
            tags: entityArray
        })
    });
});

module.exports = router;