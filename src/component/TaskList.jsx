import React, { useState } from 'react';
import Button from './Button';
import '../assets/styles/tasklist.css';

export default function TaskList({ task, setTaskList, completedTasks, setCompletedTasks }) {
  // Track which task is being edited
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState(''); // State to manage the edited task value

  const handleDelete = (index) => {
    const isConfirmed = confirm('Are you sure you want to delete this task?');
    if (isConfirmed) {
      // Remove the task and its completion state
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
    setEditIndex(index); // Set the task to edit mode
    setEditedTask(task[index]); // Set the edited task value to the current task
  };

  const handleTaskEdit = (event, index) => {
    // Update the task list with the edited value
    const updatedTaskList = task.map((taskItem, taskIndex) =>
      taskIndex === index ? editedTask : taskItem
    );
    setTaskList(updatedTaskList);
    setEditIndex(null); // Exit edit mode after saving
  };

  const handleEditCancel = () => {
    setEditIndex(null); // Exit edit mode if cancelled
  };

  return (
    <div>
      {task.map((taskItem, index) => (
        <div key={index} className="group">
          <div className={`border-4 m-2.5 p-2 flex flex-col md:flex-row justify-between items-center ${completedTasks[index] ? 'completed-task-container' : 'task-container'} bg-[#A6B1E1] text-[#424874] w-[70vw] hover:bg-[#6e7bb6]`}>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="border-1 border-cyan-50 p-2 h-6 w-6"
                name="taskCheck"
                checked={completedTasks[index] || false} // Ensure it stays a controlled input
                onChange={() => handleCheckboxChange(index)}
              />
              {editIndex === index ? (
                // Show input for editing the task
                <input
                  type="text"
                  value={editedTask}
                  className="border-1 m-2 p-1 bg-[#F4EEFF] text-[#424874] w-[50vw]"
                  onChange={(e) => setEditedTask(e.target.value)} // Update editedTask on change
                />
              ) : (
                // Show task as plain text
                <p
                  className={`text-cyan-50 p-2 font-medium text-xl ${
                    completedTasks[index] ? 'line-through' : ''
                  }`}
                >
                  {taskItem}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-300">
              {editIndex === index ? (
                <>
                  <Button
                    label="Save"
                    type="button"
                    className="text-white bg-[#424874] p-2 rounded m-1 w-14 hover:bg-[#7c8bcc]"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default behavior
                      handleTaskEdit(e, index);
                    }}
                  />
                  <Button
                    label="Cancel"
                    type="button"
                    className="text-white bg-[#606ab4] p-2 rounded m-1 hover:bg-[#7c8bcc]"
                    onClick={handleEditCancel}
                  />
                </>
              ) : (
                <>
                  <Button
                    label="Edit"
                    type="button"
                    className="text-white bg-[#424874] p-2 rounded m-1 w-14 hover:bg-[#7c8bcc]"
                    onClick={() => handleEdit(index)}
                  />
                  <Button
                    label="Delete"
                    type="button"
                    className="text-white bg-[#606ab4] p-2 rounded m-1 hover:bg-[#7c8bcc]"
                    onClick={() => handleDelete(index)}
                  />
                </>
              )}
            </div>
          </div>
          {/* Conditionally render the completion message */}
          {completedTasks[index] && (
            <span className="text-green-500 text-sm ml-10">Task Complete!</span>
          )}
        </div>
      ))}
    </div>
  );
}
