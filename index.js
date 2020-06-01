const express = require('express');
const app = express();
const port = 8000;

//routes
const data = require('./routes/data');
const actions = require('./routes/actions');

//creates connection with databse and builds schema
const db = require('./model/task_list_db');

// set view for the project
app.set('view engine','ejs');
app.set('views','./views');

// middleware functions
app.use(express.urlencoded());
app.use(express.static('assets'));

//used in multiple files so made it available globally
let gv = require('./routes/global_vaiable'); 

app.use('/data',data); //for all urls /data/....
app.use('/act',actions); //for all urls /act/....


// calculating total incomplete tasks beforehand
db.Task.find({checked:false},function(err,data){
    if(err){
        console.log("error calculating total tasks");
    }
    for(let i of data){
        gv.totalCount++;
    }
});

//creating server 
app.listen(port,function(err){
    if(err){
        console.log("fuck fuck fuck");
    }
});

//request for home page
app.get('/',function(req,res,next){
    db.Task.find({},function(err,tasks){
        if(err){
            console.log("error in fetching tasks from db");
            return;
        }
        res.render('home',{task:tasks,count:gv.totalCount}); 
    });
});
