const db = require('../model/task_list_db'); // database access
const gv = require('../routes/global_vaiable'); //global variable file

//adds a task to list
module.exports.submit = function(req,res){
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
    gv.totalCount++;
    res.redirect('back');
};

//delete all completed tasks
module.exports.deleteCompleted = function(req,res){
    db.Task.deleteMany({checked:true},function(err){
        if(err){
            console.log(err);
        }
        res.redirect('back');
    });
};

//marks all tasks as completed
module.exports.markAllComplete = function(req,res){
    db.Task.updateMany({checked:false},{checked:true},function(err,data){
        if(err){
            console.log(err);
        }
        gv.totalCount = 0;
        res.redirect('back');
    });
};

//delete all the tasks
module.exports.deleteEverything = function(req,res){
    db.Task.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        gv.totalCount = 0;
        res.redirect('back');
    });
};

//marks a task as completed
module.exports.completeTask = function(req,res){
    db.Task.findById(req.query.id,function(err,data){
        if(err){
            console.log("given id is not in the database");
            return;
        }
        if(data.checked){
            db.Task.findByIdAndUpdate(req.query.id,{checked:false},function(err,data){
                if(err){
                    console.log("issue in marking incomplete");
                }
            });
            gv.totalCount++;
            res.send(true); //sending previous value
        }else{
            db.Task.findByIdAndUpdate(req.query.id,{checked:true},function(err,data){
                if(err){
                    console.log("issue in marking complete");
                } 
            });
            gv.totalCount--;
            res.send(false); //sending previous value
        }
    });
};

//deletes a particular task
module.exports.deleteTask = function(req,res){
    db.Task.findByIdAndDelete(req.params.id,function(err,data){
        if(err){
            console.log("given id is not in database");
        }
        if(!data.checked){
            gv.totalCount--;
        }
    });
    res.redirect('back');
};