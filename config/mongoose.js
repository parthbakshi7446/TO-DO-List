const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasklist_db');
const db = mongoose.connection;

db.on('error',function(err){
    console.log(123);
    if(err){
        console.log("bandh gya patta");
    }
});

db.once('open',function(){
    console.log("successfully connected to db,balle balle!!");
});