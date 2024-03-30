import { useTasksContext } from "../hooks/useTasksContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext()

    const handleClick = async () => {
        const response = await fetch('/api/tasks/'+ task._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_TASK', payload:json})
        }
    }
    
    return (
        <div className="task-details">
            <h4>{task.name}</h4>
            <p></p>
            <p><strong>Task Type: {task.type}</strong></p>
            <p><strong>Task Duration: {task.duration}</strong></p>
            <p><strong>Task Description: {task.description}</strong></p>
            <p>{formatDistanceToNow(new Date(task.createdAt),{ addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
} 

export default TaskDetails