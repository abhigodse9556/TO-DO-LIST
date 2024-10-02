import React from "react";
import AddSubTasks from "./AddSubTasks";

export default function TaskDetails({ taskTitle, subtasks, setTasks, tasks }) {
  return (
    <div className="flex flex-col items-center w-[80vw] md:p-10 md:items-start justify-center">
      <h2 className="text-[#A6B1E1] font-bold 2xl:text-4xl lg:text-3xl md:text-2xl text-lg capitalize text-center m-5">
        {taskTitle}
      </h2>
      <label htmlFor="description" className="text-[#F4EEFF] font-bold 2xl:text-3xl lg:text-xl md:text-lg text-md mx-2 w-[90vw]">Describe your task:</label>
      <textarea name="" id="description" className='mx-2 w-[90vw] md:w-[70vw] h-[25vh] rounded-lg bg-[#F4EEFF] text-cyan-900 md:text-2xl p-2 font-semibold'></textarea>
      <label htmlFor="date" className="text-[#F4EEFF] font-bold 2xl:text-3xl lg:text-xl md:text-md text-md m-2 w-[90vw]">Deadline:</label>
      <input type="date" name="" id="date" className='mx-2 w-[90vw] md:w-[70vw] rounded-lg bg-[#F4EEFF] md:text-md p-2 font-semibold' />
      <label
        htmlFor="description"
        className="text-[#F4EEFF] font-bold 2xl:text-3xl lg:text-xl md:text-lg text-md mx-2 w-[90vw]"
      >
        Subtasks:
      </label>
      <AddSubTasks
        selectedTask={{ title: taskTitle, subtasks }} // Pass selected task's subtasks
        setTasks={setTasks} // Pass setTasks to modify task list
        tasks={tasks} // Pass tasks to update subtasks in the main task
      />
    </div>
  );
}
