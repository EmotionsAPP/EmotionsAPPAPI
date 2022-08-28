const mongoose = require('mongoose');
const logger = require('../logger/api.logger');
const fs = require('fs');
const path = require("path");

const connect = () => {

    const url = process.env.MONGO_CONNECTION_STRING;
    logger.info("process.env.MONGO_CONNECTION_STRING :::" + process.env.MONGO_CONNECTION_STRING);

    mongoose.connect(url, {
        dbName: 'EmotionsAPP',
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ssl: true, 
        sslCert: fs.readFileSync(path.resolve(__dirname, './ca.pem')),
        sslKey: fs.readFileSync(path.resolve(__dirname, './ca.pem')),    
        sslValidate: false
    })

    mongoose.connection.once("open", async () => {
        logger.info("Connected to database");
    });
      
    mongoose.connection.on("error", (err) => {
        logger.error("Error connecting to database", err);
    });
}

const disconnect = () => {
    
    if (!mongoose.connection) {
      return;
    }
    
    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Diconnected  to database");
    });

};

module.exports = {
    connect,
    disconnect
}