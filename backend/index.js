const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/appsettings.js");
const users = require("./routes/users.js");

//create express app
const app = express();

//connect to database
mongoose.connect(config.dbConnectionString);

// handle db connection success
mongoose.connection.on('connected', () => {
    console.log("Connected to database: " + config.dbConnectionString);
});

// handle db connection error
mongoose.connection.on('error', (err) => {
    console.log("Error occurred while connecting to database: " + err);
});

// enable cross domain support
app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.use('/users', users);

app.listen(config.appPort, () => {
    console.log("Server started at port " + config.appPort + ".");
});