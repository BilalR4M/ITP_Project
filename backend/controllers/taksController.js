const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// get all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({createAt: -1})

    res.status(200).json(tasks)
}


// get a single task
const getTask = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findById(id)

    if(!task){
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)


}


// create new task
const createTask = async (req, res) => {
    const{name, type, duration, description} = req.body
    
    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }
    if(!type){
        emptyFields.push('type')
    }
    if(!duration){
        emptyFields.push('duration')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }

    // add doc to db
    try {
        const task =await Task.create({name, type, duration, description})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
    
}

// delete a task
const deleteTask = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if(!task){
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if(!task){
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(task)
    
}


module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}