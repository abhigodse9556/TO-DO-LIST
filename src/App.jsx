import { useState, useEffect } from "react";
import "./App.css";
import Textfiled from "./component/Textfiled";
import Button from "./component/Button";
import TaskList from "./component/TaskList";
import SortDropdown from "./component/SortDropdown";
import TaskDetails from "./component/TaskDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [listening, setListening] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // For task details

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("taskList"));
    const storedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks"));

    if (storedTasks && storedTasks.length > 0) {
      setTaskList(storedTasks);
    }

    if (storedCompletedTasks && storedCompletedTasks.length > 0) {
      setCompletedTasks(storedCompletedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [taskList, completedTasks]);

  useEffect(() => {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTask(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }, []);

  const handleVoiceInput = () => {
    setListening(true);
    recognition.start();
  };

  const handleTaskChange = (newTask) => {
    setTask(newTask);
  };

  const handleTaskAdd = () => {
    if (task) {
      setTaskList([task, ...taskList]);
      setCompletedTasks([false, ...completedTasks]);
      setTask("");
    } else {
      alert("Please enter a task");
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleTaskClick = (taskIndex) => {
    setSelectedTask({
      title: taskList[taskIndex],
      description: "", // Default empty description
      subtasks: [], // Default empty subtasks
    });
  };

  const { sortedTasks, sortedCompleted } = (() => {
    let sortedTasks = [...taskList];
    let sortedCompleted = [...completedTasks];

    switch (sortOrder) {
      case "oldest":
        sortedTasks.reverse();
        sortedCompleted.reverse();
        break;
      case "incomplete":
        sortedTasks = sortedTasks
          .filter((_, index) => !completedTasks[index])
          .concat(sortedTasks.filter((_, index) => completedTasks[index]));
        sortedCompleted = sortedCompleted
          .filter((c) => !c)
          .concat(sortedCompleted.filter((c) => c));
        break;
      case "complete":
        sortedTasks = sortedTasks
          .filter((_, index) => completedTasks[index])
          .concat(sortedTasks.filter((_, index) => !completedTasks[index]));
        sortedCompleted = sortedCompleted
          .filter((c) => c)
          .concat(sortedCompleted.filter((c) => !c));
        break;
      case "newest":
      default:
        break;
    }

    return { sortedTasks, sortedCompleted };
  })();

  return (
    <div className="bg-[#424874] flex flex-col items-center md:py-4 w-[100vw] md:max-w-[80vw] mx-auto h-[100vh] md:max-h-[90vh]">
    <h1 className="text-[#A6B1E1] p-2 text-3xl md:text-4xl 2xl:text-6xl lg:text-5xl font-extrabold italic animate-pulse md:w-[70vw]">
      To-Do List
    </h1>
      {selectedTask ? (
        <TaskDetails
          taskTitle={selectedTask.title}
          description={selectedTask.description}
          subtasks={selectedTask.subtasks}
          setSelectedTask={setSelectedTask} // To close details view
        />
      ) : (
        <>
          <div className="sticky top-0 flex flex-col items-center md:items-start">
            <Textfiled
              label="What is your task?"
              type="text"
              placeholder="Enter task"
              value={task}
              onChange={handleTaskChange}
              voiceButton={
                <Button
                  className="text-[#424874] bg-[#f3f3f3] p-2 rounded hover:bg-[#ccd1e9] ml-2 absolute right-7 md:right-4 bottom-7"
                  label={
                    listening ? (
                      <FontAwesomeIcon icon={faMicrophoneSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faMicrophone} />
                    )
                  }
                  onClick={handleVoiceInput}
                />
              }
            />
            <div className="flex justify-between items-center md:w-[70vw]">
              <Button
                className="text-[#424874] bg-[#A6B1E1] p-2 rounded m-5 hover:bg-[#ccd1e9]"
                label="Add Task"
                onClick={handleTaskAdd}
              />
              <SortDropdown onSortChange={handleSortChange} />
            </div>
          </div>
          <div className="md:h-full overflow-y-auto">
            <TaskList
              task={sortedTasks}
              setTaskList={setTaskList}
              completedTasks={sortedCompleted}
              setCompletedTasks={setCompletedTasks}
              onTaskClick={handleTaskClick} // Pass click handler
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
