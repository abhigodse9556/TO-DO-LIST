import React from 'react';
import Button from './Button';

export default function TaskList({ task, setTaskList, completedTasks, setCompletedTasks }) {

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

  return (
    <div>
      {task.map((taskItem, index) => (
        <div key={index}>
          <div className="border-2 m-2 p-2 flex justify-between items-center bg-emerald-500">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="border-1 border-cyan-50 p-2 h-6 w-6"
                name="taskCheck"
                checked={completedTasks[index] || false} // Ensure it stays a controlled input
                onChange={() => handleCheckboxChange(index)}
              />
              <p
                className={`text-cyan-50 p-2 font-medium text-xl ${
                  completedTasks[index] ? 'line-through' : ''
                }`}
              >
                {taskItem}
              </p>
            </div>
            <Button
              label="Delete"
              type="button"
              className="text-white bg-red-500 p-2 rounded m-1"
              onClick={() => handleDelete(index)}
            />
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
