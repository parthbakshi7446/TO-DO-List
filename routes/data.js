const express = require('express');
const router = express.Router();

module.exports = router;

// access controller
const control = require('../controllers/data_controller');


// display all tasks
router.get('/',control.dataHome);

//display all completed tasks
router.get('/complete',control.dataComplete);

//display all incmplete tasks
router.get('/incomplete',control.dataIncomplete);