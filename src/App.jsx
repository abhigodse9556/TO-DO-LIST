import { useState } from 'react';
import './App.css';
import Textfiled from './component/Textfiled';
import Button from './component/Button';
import TaskList from './component/TaskList';

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); // State for tracking completed tasks

  const handleTaskChange = (newTask) => {
    setTask(newTask);
  };

  const handleTaskAdd = () => {
    if (task) {
      setTaskList([...taskList, task]);
      setCompletedTasks([...completedTasks, false]); // Add a new false for each task to track completion status
      setTask("");
    } else {
      alert("Please enter a task");
    }
  };

  return (
    <div className='p-10'>
      <Textfiled
        label="Task"
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={handleTaskChange}
      />
      <Button
        className="bg-black text-white p-2 rounded m-5"
        label="Add Task"
        onClick={handleTaskAdd}
      />
      <TaskList
        task={taskList}
        setTaskList={setTaskList}
        completedTasks={completedTasks} // Pass completedTasks array
        setCompletedTasks={setCompletedTasks} // Pass setter for completedTasks
      />
    </div>
  );
}

export default App;
