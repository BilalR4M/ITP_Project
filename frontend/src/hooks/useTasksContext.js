import { TasksContext } from "../Context/TasksContext";
import { useContext } from "react";

export const useTasksContext = () => {
  const context =  useContext(TasksContext);
  
    if(!context) {
        throw Error('useTasksContext must be used inside an WorkoutsContextProvider')
    }

  return context;
};