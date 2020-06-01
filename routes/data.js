const express = require('express');
// const app = express();

const router = express.Router();
const db = require('../model/task_list_db');
module.exports = router;
router.get('/',function(req,res){
    db.Task.find({},function(err,data){
        if(err){
            console.log("error in return all data");
            return;
        }
        res.render('home',{task:data,count:totalCount});
    }); 
});