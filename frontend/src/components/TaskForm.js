import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"

const TaskForm = () => {
    const { dispatch } = useTasksContext()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = {
            name,
            type,
            duration,
            description
        }

        const response = await fetch('/api/tasks',{
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setType('')
            setDuration('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('new task added')
            dispatch({
                type: 'ADD_TASK',
                payload: json
            })
        }
    }

    return (
        <form className = "create" onSubmit={handleSubmit}>
            <h3>Add a New Task</h3>

            <label>Task:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Type:</label>
            <input 
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
                className={emptyFields.includes('type') ? 'error' : ''}
            />
            <label>Duration(in hrs):</label>
            <input 
                type="number"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                className={emptyFields.includes('duration') ? 'error' : ''}
            />
            <label>Description:</label>
            <textarea 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />
            <br></br>

            <button>Add task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default TaskForm;