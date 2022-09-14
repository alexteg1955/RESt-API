
const express = require("express");
const app = express();

// requiring all the npm in the server
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const path = require("path");



//connecting our app.js with mongoDB Server i.e configuring the dotenv file
dotenv.config()

// connecting to mongoDB, using the dotenv pacakge to access out databse
mongoose.connect(process.env.DATABASE_URL, () => console.log("Database is connected Successfully"), {useNewUrlParser: true}, {useUnifiedTopology: true});
const db = mongoose.connection.openUri


// View engine setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

// making use of a router when the application is run
const subscribersRouter = require("./routes/subscribers")
app.use("/subscribers", subscribersRouter)


app.listen(3000, function() {
    console.log("server is running on port 3000")
});


// db.on('error', (error) => console.error(error));

// db.once('open', () => console.log("Database is connected Successfully"));





