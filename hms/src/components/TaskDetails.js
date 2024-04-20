// TaskDetails component
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskDetails = ({ task, onSelectTask }) => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();

    const handleClickDelete = async () => {
        if (!user) {
            return;
        }

        const response = await fetch('/api/tasks/' + task._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            dispatch({ type: 'DELETE_TASK', payload: task._id });
        }
    };

    const handleClickUpdate = () => {
        onSelectTask(task); // Pass the selected task to the parent component (Home)
    };

    return (
        <div className="task-details">
            <h4>{task.name}</h4>
            <p><strong>Task Type:</strong> {task.type}</p>
            <p><strong>Task Duration:</strong> {task.duration}</p>
            <p><strong>Task Description:</strong> {task.description}</p>
            <p>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClickDelete}>delete</span>
            <span className="material-symbols-outlined" onClick={handleClickUpdate}>update</span>
        </div>
    );
};

export default TaskDetails;
