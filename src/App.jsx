import { useState, useEffect } from 'react';
import './App.css';
import Textfiled from './component/Textfiled';
import Button from './component/Button';
import TaskList from './component/TaskList';

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); // State for tracking completed tasks

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('taskList'));
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'));

    if (storedTasks && storedTasks.length > 0) {
      setTaskList(storedTasks);
    }
    
    if (storedCompletedTasks && storedCompletedTasks.length > 0) {
      setCompletedTasks(storedCompletedTasks);
    }
  }, []);

  // Save tasks and completedTasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [taskList, completedTasks]);

  const handleTaskChange = (newTask) => {
    setTask(newTask);
  };

  const handleTaskAdd = () => {
    if (task) {
      setTaskList([task, ...taskList]);
      setCompletedTasks([false, ...completedTasks]); // Add a new false for each task to track completion status
      setTask("");
    } else {
      alert("Please enter a task");
    }
  };

  return (
    <div className='bg-[#424874] flex flex-col items-center p-10 max-w-5xl mx-auto max-h-[100vh] md:max-h-[90vh]'>
      <div className='sticky top-0'>
        <h1 className='text-[#A6B1E1] p-2 text-4xl font-extrabold italic animate-pulse'>To-Do List</h1>
        <Textfiled
          label="What is your task?"
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={handleTaskChange}
        />
        <Button
          className="text-[#424874] bg-[#A6B1E1] p-2 rounded m-5 hover:bg-[#ccd1e9]"
          label="Add Task"
          onClick={handleTaskAdd}
        />
      </div>
      <div className='md:h-full overflow-y-auto '>
        <TaskList
          task={taskList}
          setTaskList={setTaskList}
          completedTasks={completedTasks} // Pass completedTasks array
          setCompletedTasks={setCompletedTasks} // Pass setter for completedTasks
        />
      </div>
    </div>
  );
}

export default App;
