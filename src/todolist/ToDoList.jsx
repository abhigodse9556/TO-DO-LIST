import { useState, useEffect } from "react";
import "./styles/todo.css";
import Button from "./component/Button";
import TaskDetails from "./component/TaskDetails";
import AddTasks from "./component/AddTasks";

function ToDoList() {
  const [selectedTask, setSelectedTask] = useState(null); // Shared state for task details

    useEffect(() => {
        document.title = "To-Do List";
    }, []);

    return (
        <div className="bg-[#424874] flex flex-col items-center md:py-4 w-[100vw] md:max-w-[80vw] mx-auto h-[100vh] md:max-h-[90vh]">
        <h1 className="text-[#A6B1E1] p-2 text-3xl md:text-4xl 2xl:text-6xl lg:text-5xl font-extrabold italic animate-pulse md:w-[70vw]">
            To-Do List
        </h1>

        {/* Conditionally display TaskDetails if a task is selected */}
        {selectedTask ? (
                <>
                    <TaskDetails
                        taskTitle={selectedTask.title}
                        description={selectedTask.description}
                        subtasks={selectedTask.subtasks}
                        setSelectedTask={setSelectedTask } // Close details view
                    />
                    <Button
                        className="text-[#424874] bg-[#A6B1E1] p-2 rounded m-5 hover:bg-[#ccd1e9]"
                        label="Close"
                        onClick={() => setSelectedTask(null)} // Close details when clicking Close
                    />
                </>
            ) : (
                <>
                    <AddTasks 
                        setSelectedTask={setSelectedTask} 
                    />
                </>
        )}
        </div>
    );
}

export default ToDoList;
