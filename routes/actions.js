const express = require('express');
const router = express.Router();

module.exports = router;

//access controller
const control = require('../controllers/action_controller');

//adds a task to list
router.post('/submit-task',control.submit);  

//marks all tasks as completed
router.get('/mark-all-done',control.markAllComplete);

//marks a task as completed
router.post('/mark-check',control.completeTask);

//delete all completed tasks
router.get('/all-done',control.deleteCompleted);

//delete all the tasks
router.get('/delete-all',control.deleteEverything);

//deletes a particular task
router.get('/delete-task/:id',control.deleteTask);