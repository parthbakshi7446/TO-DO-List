const mongoose = require('mongoose');

//create connection between server and database
const buildconnection = require('../config/mongoose');

//create schema
let todoschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    checked:{
        type:Boolean,
        required:true
    },
    date:{
        type:String
    }
});

// create collection
module.exports.Task = mongoose.model('Task',todoschema);