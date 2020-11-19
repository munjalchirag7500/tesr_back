var express = require('express');
var mongoose=require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors= require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const dbURL='mongodb://localhost/resto'

mongoose.connect(dbURL,{
    useCreateIndex:true,
    useNewUrlParser:true
})

mongoose.connection.on('connected', function(){  
    console.log("Mongoose default connection is open to ", dbURL);
 });


 mongoose.connection.on('error', function(err){
    console.log("Mongoose default connection has occured "+err+" error");
});

app.use('/admins/api', indexRouter);
app.use('/api', usersRouter);

module.exports = app;
