// import { useEffect } from "react";
// import { useTasksContext } from "../hooks/useTasksContext"
// import { useAuthContext } from "../hooks/useAuthContext"

// // components
// import TaskDetails from '../components/TaskDetails'
// import TaskForm from "../components/TaskForm"

// const Home = () => {
//     const {tasks, dispatch} = useTasksContext()

//     const {user} = useAuthContext()

//     useEffect(() => {
//         const fetchTasks = async () => {
//             const response = await fetch('/api/tasks', {
//                 headers: {
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             })
                
//             const json = await response.json()

//             if (response.ok) {
//                 dispatch({type: 'SET_TASKS', payload: json})
//             }
//         }

//         if (user){
//             fetchTasks()
//         }
        
//     }, [dispatch, user])

//     return (
//         <div className="home">
//             <div className="tasks">
//                 <h1>Tasks</h1>
//                 {tasks && tasks.map((task)=>(
//                     <TaskDetails key={task._id} task={task} />
//                 ))}
//             </div>
//             <TaskForm />
//         </div>
//     )
// }

// export default Home;

import { useState, useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TaskDetails from '../components/TaskDetails';
import TaskForm from "../components/TaskForm";

const Home = () => {
    const { tasks, dispatch } = useTasksContext();
    const { user } = useAuthContext();
    const [selectedTask, setSelectedTask] = useState(null); // State to hold the selected task for updating
    const [showAddForm, setShowAddForm] = useState(false); // State to track whether to show the add task form

    useEffect(() => {
        const fetchTasks = async () => {
            if (user) {
                const response = await fetch('/api/tasks', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    const json = await response.json();
                    dispatch({ type: 'SET_TASKS', payload: json });
                }
            }
        };

        fetchTasks();
    }, [dispatch, user]);

    const handleShowAddForm = () => {
        setSelectedTask(null); // Reset selected task
        setShowAddForm(true);
    };

    return (
        <div className="home">
            <div className="tasks">
                <h1>Tasks</h1>
                {tasks && tasks.map(task => (
                    <TaskDetails key={task._id} task={task} onSelectTask={setSelectedTask} />
                ))}
            </div>
            <div className="forms">
                {selectedTask ? (
                    <TaskForm task={selectedTask} setSelectedTask={setSelectedTask} />
                ) : (
                    <TaskForm />
                )}
            </div>
        </div>
    );
};

export default Home;
