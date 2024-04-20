import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'ADD_TASK':
            return {
                tasks: [...state.tasks, action.payload]
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((w)=> w._id !== action.payload._id)
            }
        case 'UPDATE_TASK':
            return {
                tasks: state.tasks.map((w)=> w._id === action.payload._id? action.payload : w)
            }
        case 'UPDATE_TASK_STATUS':
            return {
                tasks: state.tasks.map((w)=> w._id === action.payload._id? {...w, status: action.payload.status} : w)
            }
        default:
            return state
    }
}

export const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })


    
    return (
        <TasksContext.Provider value ={{...state,dispatch}}>
            { children }
        </TasksContext.Provider>
    )
}