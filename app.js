var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
const mongoose = require("mongoose");

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/api/users', usersRouter);

const url = "mongodb+srv://Mikaela:mikaela90@cluster0.qkpmecu.mongodb.net/?retryWrites=true&w=majority"

async function init(){
    try{
        const options = {useNewUrlParser: true, useUnifiedTopology: true}
       await mongoose.connect(url, options)
        console.log("Connected to the database")
    } catch(error){
        console.error(error)
    }
}

init()
module.exports = app;
