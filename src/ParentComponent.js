import AddTask from "./AddTask";
import TaskComponent from "./TaskComponent";
import { useState } from "react";

function ParentComponent() {
  const [toDoTasks, setToDoTasks] = useState([{ id: 23, taskName: "Wash clothes", isTaskDone: true }])

  const addTaskHandler = (value) => {
    if (value === '') {
      alert("Fill the input box to add a task")
    }
    else {
      const updatedTaskList = [...toDoTasks];
      const newObj = { id: Math.floor(Math.random() * 1000 + 1), taskName: value, isTaskDone: false };
      updatedTaskList.push(newObj);
      setToDoTasks(updatedTaskList);
      
    }
  }

  const onDeleteHandler = (id) => {
     const updatedTaskList = [...toDoTasks];
     const newList = updatedTaskList.filter(task => task.id !== id);
     setToDoTasks(newList);
  }

  const isTaskDoneHandler = (id) =>{
     const updatedTaskList = [...toDoTasks];
     const taskIndex = updatedTaskList.findIndex((task)=>task.id === id);
     updatedTaskList[taskIndex].isTaskDone = !updatedTaskList[taskIndex].isTaskDone;
     setToDoTasks(updatedTaskList);
  }

  const onTaskUpdate = (id, event) =>{
    const updatedTaskList = [...toDoTasks];
    const taskIndex = updatedTaskList.findIndex((task)=>task.id===id);
    updatedTaskList[taskIndex].taskName = event.target.value;
    setToDoTasks(updatedTaskList);
  }
  
  console.log(toDoTasks);
  const updatedTaskList = [...toDoTasks];
  const listItems = updatedTaskList.map((task) => { return <TaskComponent key={task.id} task={task} onDelete = {onDeleteHandler} isTaskDone = {isTaskDoneHandler} onUpdate = {onTaskUpdate}/> })

  return (
    <div className="mainDiv">
      <h2>To Do List</h2>
      <AddTask addTask={addTaskHandler} />
      <ul>
        {listItems}
      </ul>
    </div>
  );
}

export default ParentComponent;
