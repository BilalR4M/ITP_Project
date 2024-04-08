const express = require('express')
const { createTask,
        getTask,
        getTasks,
        deleteTask,
        updateTask
} = require('../controllers/taksController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all tasks routes
router.use(requireAuth)

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

