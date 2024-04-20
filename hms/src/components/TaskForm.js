import { useState, useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = ({ task, setSelectedTask }) => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    const isUpdating = !!task; // Check if task is present to determine if updating

    useEffect(() => {
        if (isUpdating) {
            setName(task.name || '');
            setType(task.type || '');
            setDuration(task.duration || '');
            setDescription(task.description || '');
        } else {
            // Reset form fields when adding a new task
            setName('');
            setType('');
            setDuration('');
            setDescription('');
        }
    }, [task, isUpdating]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            return;
        }

        const taskData = {
            name,
            type,
            duration,
            description,
        };

        if (isUpdating) {
            const response = await fetch(`/api/tasks/${task._id}`, {
                method: 'PATCH',
                body: JSON.stringify(taskData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                setName('');
                setType('');
                setDuration('');
                setDescription('');
                dispatch({ type: 'UPDATE_TASK', payload: { ...task, ...taskData } });
            }
        } else {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(taskData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                setName('');
                setType('');
                setDuration('');
                setDescription('');
                dispatch({ type: 'ADD_TASK', payload: taskData });
            }
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>{isUpdating ? 'Update Task' : 'Add New Task'}</h3>
            <label>Task:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Type:</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            <label>Duration (in hrs):</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <button>{isUpdating ? 'Update Task' : 'Add Task'}</button>
            {isUpdating && (
                <button type="button" onClick={() => setSelectedTask(null)}>Add New</button>
            )}
        </form>
    );
};

export default TaskForm;
