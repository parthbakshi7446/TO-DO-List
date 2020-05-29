const mongoose = require('mongoose');

//create connection between server and database
const buildconnection = require('../config/mongoose');

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
    }
});

let Task = mongoose.model('Task',todoschema);

module.exports = Task;