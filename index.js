const express = require('express');
const app = express();

const Task = require('./model/task_list_db');

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));

app.listen(8000,function(err){
    if(err){
        console.log("fuck fuck fuck");
    }
    
});
app.get('/',function(req,res,next){

    Task.find({},function(err,tasks){
        if(err){
            console.log("error in fetching tasks from db");
            return;
        }
        res.render('home',{task:tasks});
    });

    
});

app.post('/submit-task',function(req,res,next){
    
    console.log(65432134567897654321);
    console.log(req.body);
    Task.create({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        checked:false
    },function(err,newtask){
        console.log('hmm');
        if(err){
            console.log('ni ghusa');
            return;
        }
        console.log("**ghusa**",newtask);
    });
    res.redirect('back');
});

app.get('/delete-contact/:id',function(req,res,next){
    console.log(req.params);
    Task.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log("ye samaan databse mai nhi h");
        }
    });
    res.redirect('back');
});