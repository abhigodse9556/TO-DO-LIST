import { useState, useEffect } from 'react';
import './App.css';
import Textfiled from './component/Textfiled';
import Button from './component/Button';
import TaskList from './component/TaskList';
import SortDropdown from './component/SortDropdown'; // Import SortDropdown

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); // State for tracking completed tasks
  const [sortOrder, setSortOrder] = useState("newest"); // State for sorting tasks

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

  const handleSortChange = (order) => {
    setSortOrder(order); // Set the sorting order based on user selection
  };

  const getSortedTasks = () => {
    let sortedTasks = [...taskList];
    let sortedCompleted = [...completedTasks];

    switch (sortOrder) {
      case "oldest":
        // Sort by oldest (default order from localStorage is already oldest, so just reverse the newest order)
        sortedTasks.reverse();
        sortedCompleted.reverse();
        break;
      case "incomplete":
        // Sort with incomplete tasks first
        sortedTasks = sortedTasks.filter((_, index) => !completedTasks[index]).concat(
          sortedTasks.filter((_, index) => completedTasks[index])
        );
        sortedCompleted = sortedCompleted.filter(completed => !completed).concat(
          sortedCompleted.filter(completed => completed)
        );
        break;
      case "complete":
        // Sort with complete tasks first
        sortedTasks = sortedTasks.filter((_, index) => completedTasks[index]).concat(
          sortedTasks.filter((_, index) => !completedTasks[index])
        );
        sortedCompleted = sortedCompleted.filter(completed => completed).concat(
          sortedCompleted.filter(completed => !completed)
        );
        break;
      case "newest":
      default:
        // Newest is default, already set
        break;
    }

    return { sortedTasks, sortedCompleted };
  };

  const { sortedTasks, sortedCompleted } = getSortedTasks(); // Get sorted tasks

  return (
    <div className='bg-[#424874] flex flex-col items-center md:p-10 w-[100vw] md:max-w-[80vw] mx-auto h-[100vh] md:max-h-[90vh]'>
      <div className='sticky top-0 flex flex-col items-center md:items-start'>
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
        <SortDropdown onSortChange={handleSortChange} /> {/* Add SortDropdown here */}
      </div>
      <div className='md:h-full overflow-y-auto'>
        <TaskList
          task={sortedTasks} // Pass sorted tasks
          setTaskList={setTaskList}
          completedTasks={sortedCompleted} // Pass sorted completion status
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </div>
  );
}

export default App;
