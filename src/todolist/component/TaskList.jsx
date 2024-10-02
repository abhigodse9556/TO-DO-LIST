import React, { useState } from 'react';
import Button from './Button';
import '../styles/tasklist.css';

export default function TaskList({ task, setTaskList, completedTasks, setCompletedTasks, onTaskClick }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const handleDelete = (index) => {
    const isConfirmed = confirm('Are you sure you want to delete this task?');
    if (isConfirmed) {
      const newTaskList = task.filter((_, taskIndex) => taskIndex !== index);
      setTaskList(newTaskList);
      const newCompletedTasks = completedTasks.filter((_, taskIndex) => taskIndex !== index);
      setCompletedTasks(newCompletedTasks);
    }
  };

  const handleCheckboxChange = (index) => {
    setCompletedTasks(
      completedTasks.map((isCompleted, taskIndex) =>
        taskIndex === index ? !isCompleted : isCompleted
      )
    );
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTask(task[index]);
  };

  const handleTaskEdit = (event, index) => {
    const updatedTaskList = task.map((taskItem, taskIndex) =>
      taskIndex === index ? editedTask : taskItem
    );
    setTaskList(updatedTaskList);
    setEditIndex(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  return (
    <div>
      {task.map((taskItem, index) => (
        <div key={index} className="group relative">
          <div
            className={`border-4 m-2.5 p-2 flex flex-col md:flex-row justify-between ${completedTasks[index] ? 'completed-task-container' : 'task-container'} bg-[#A6B1E1] text-[#424874] w-[70vw] hover:bg-[#6e7bb6]`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="border-1 border-cyan-50 p-2 md:h-6 md:w-6 h-3 w-3"
                name="taskCheck"
                checked={completedTasks[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedTask}
                  className="border-1 m-2 p-1 bg-[#F4EEFF] text-[#424874] w-[50vw] md:font-bold"
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <p className={`text-cyan-50 p-2 font-medium md:text-xl text-sm ${completedTasks[index] ? 'line-through' : ''} cursor-pointer`}
                  onClick={() => onTaskClick(index)}
                >
                  {taskItem}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-300">
              {editIndex === index ? (
                <>
                  <Button label="Save" type="button" className="text-white bg-[#424874]" onClick={(e) => handleTaskEdit(e, index)} />
                  <Button label="Cancel" type="button" className="text-white bg-[#606ab4]" onClick={handleEditCancel} />
                </>
              ) : (
                <>
                  <Button label="Edit" type="button" className="text-white bg-[#424874]" onClick={() => handleEdit(index)} />
                  <Button label="Delete" type="button" className="text-white bg-[#606ab4]" onClick={() => handleDelete(index)} />
                </>
              )}
            </div>
          </div>
          {completedTasks[index] && <span className="text-[#424874] font-bold text-sm ml-10 md:pl-5 absolute z-10 bottom-1.5">Task Completed!</span>}
        </div>
      ))}
    </div>
  );
}
