const { Client } = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        try {
            await mongoose.connect(config.mongodb, {
                useNewUrlParser: true,
                
                useUnifiedTopology: true,
            });

            console.log('MongoDB database connected...');
        } catch (error) {
            console.error(error);
        }

        console.log(`${client.user.username} is now online...`);
        
    }
};
