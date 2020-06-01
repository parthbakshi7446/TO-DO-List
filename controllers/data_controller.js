const db = require('../model/task_list_db');
const gv = require('../routes/global_vaiable');

// display all tasks
module.exports.dataHome = function(req,res){
    db.Task.find({},function(err,data){
        if(err){
            console.log("error in return all tasks");
            return;
        }
        res.render('home',{task:data,count:gv.totalCount});
    }); 
};

//display all completed tasks
module.exports.dataComplete = function(req,res){
    db.Task.find({checked:true},function(err,data){
        if(err){
            console.log("error in return complete tasks");
            return;
        }
        res.render('home',{task:data,count:gv.totalCount});
    });
};

//display all incmplete tasks
module.exports.dataIncomplete = function(req,res){
    db.Task.find({checked:false},function(err,data){
        if(err){
            console.log("error in return incomlete tasks");
            return;
        }
        res.render('home',{task:data,count:gv.totalCount});
    });  
};