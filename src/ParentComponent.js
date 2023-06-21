import AddTask from "./AddTask";
import TaskComponent from "./TaskComponent";
import { useCallback, useState } from "react";
import React from 'react';

function ParentComponent() {
  const [toDoTasks, setToDoTasks] = useState([]);
  const addTaskHandler = useCallback((value) => {
    if (value === '') {
      alert("Fill the input box to add a task");
    } else {
      const updatedTaskList = [...toDoTasks];
      const newObj = { id: Math.floor(Math.random() * 1000 + 1), taskName: value, isTaskDone: false };
      updatedTaskList.push(newObj);
      setToDoTasks(updatedTaskList);
      console.log("Task added");
    }
  }, [toDoTasks]);

  const onDeleteHandler = useCallback((id) => {
    const updatedTaskList = toDoTasks.filter(task => task.id !== id);
    setToDoTasks(updatedTaskList);
    console.log("Task deleted");
  }, [toDoTasks,setToDoTasks]);

  const isTaskDoneHandler = useCallback((id) => {
    const updatedTaskList = [...toDoTasks];
    const taskIndex = updatedTaskList.findIndex((task) => task.id === id);
    updatedTaskList[taskIndex].isTaskDone = !updatedTaskList[taskIndex].isTaskDone;
    setToDoTasks(updatedTaskList);
    console.log("Task checked");
  }, [toDoTasks]);

  const onTaskUpdate = useCallback((id, event) => {
    const updatedTaskList = [...toDoTasks];
    const taskIndex = updatedTaskList.findIndex((task) => task.id === id);
    updatedTaskList[taskIndex].taskName = event.target.value;
    setToDoTasks(updatedTaskList);
    console.log("Task updated");
  }, [toDoTasks]);

  const listItems = toDoTasks.map((task) => (
    <TaskComponent
      key={task.id}
      task={task}
      onDelete={onDeleteHandler}
      isTaskDone={isTaskDoneHandler}
      onUpdate={onTaskUpdate}
    />
  ));

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
