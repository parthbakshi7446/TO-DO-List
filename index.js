const express = require('express');
const app = express();

const db = require('./model/task_list_db');

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));

let totalCount=0;
db.Task.find({checked:false},function(err,data){
    if(err){
        console.log("error calculating total tasks");
    }
    for(let i of data){
        totalCount++;
    }
});


app.listen(8000,function(err){
    if(err){
        console.log("fuck fuck fuck");
    }
});
app.get('/',function(req,res,next){
    db.Task.find({},function(err,tasks){
        if(err){
            console.log("error in fetching tasks from db");
            return;
        }
        res.render('home',{task:tasks,count:totalCount}); 
    });
});

app.post('/submit-task',function(req,res,next){
    db.Task.create({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        checked:false,
        date:req.body.date      
    },function(err){
        if(err){
            console.log('error creating or submitting task ');
            return;
        }
    });
    totalCount++;
    res.redirect('back');
});

app.get('/data',function(req,res){
    db.Task.find({},function(err,data){
        if(err){
            console.log("error in return all data");
            return;
        }
        res.render('home',{task:data,count:totalCount});
    });
    
});
app.get('/data/complete',function(req,res){
    db.Task.find({checked:true},function(err,data){
        if(err){
            console.log("error in return all data");
            return;
        }
        res.render('home',{task:data,count:totalCount._id});
    });
    
});


app.get('/data/incomplete',function(req,res){
    db.Task.find({checked:false},function(err,data){
        if(err){
            console.log("error in return all data");
            return;
        }
        res.render('home',{task:data,count:totalCount});
    });
    
});

app.get('/all-done',function(req,res){
    db.Task.deleteMany({checked:true},function(err){
        if(err){
            console.log(err);
        }
        res.redirect('back');
    });
});

app.get('/mark-all-done',function(req,res){
    db.Task.updateMany({checked:false},{checked:true},function(err,data){
        if(err){
            console.log(err);
        }
        totalCount = 0;
        res.redirect('back');
    });
});

app.get('/delete-all',function(req,res){
    db.Task.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        totalCount = 0;
        res.redirect('back');
    });
});

app.post('/mark-check/',function(req,res){
    db.Task.findById(req.query.id,function(err,data){
        if(err){
            console.log("data main ni h check");
            return;
        }
        if(data.checked){
            db.Task.findByIdAndUpdate(req.query.id,{checked:false},function(err,data){
                if(err){
                    console.log("issue");
                }
            });
            totalCount++;
            res.send(true); //sending previous value
        }else{
            db.Task.findByIdAndUpdate(req.query.id,{checked:true},function(err,data){
                if(err){
                    console.log("issue");
                } 
            });
            totalCount--;
            res.send(false); //sending previous value
        }
    });
});

app.get('/delete-contact/:id',function(req,res){
    db.Task.findByIdAndDelete(req.params.id,function(err,data){
        if(err){
            console.log("ye samaan databse mai nhi h");
        }
        if(!data.checked){
            totalCount--;
        }
    });
    res.redirect('back');
});