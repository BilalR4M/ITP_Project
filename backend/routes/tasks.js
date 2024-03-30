const express = require('express')
const { createTask,
        getTask,
        getTasks,
        deleteTask,
        updateTask
} = require('../controllers/taksController')


const router = express.Router()

//get all tasks
router.get('/',getTasks)

//get a single task
router.get('/:id',getTask)


//Post a new task
router.post('/',createTask)

//Delete a task
router.delete('/:id',deleteTask)

router.patch('/:id',updateTask)



module.exports = router

