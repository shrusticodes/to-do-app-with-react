import AddTask from "./AddTask";
import TaskComponent from "./TaskComponent";
import { useCallback, useState } from "react";
import React from 'react';

function ParentComponent() {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [filter, setFilter] = useState("all");
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
  }, [toDoTasks,setToDoTasks]);

  const onDeleteHandler = useCallback((id) => {
    const updatedTaskList = toDoTasks.filter(task => task.id !== id);
    setToDoTasks(updatedTaskList);
    console.log("Task deleted");
  }, [toDoTasks, setToDoTasks]);

  const isTaskDoneHandler = useCallback((id) => {
    const updatedTaskList = [...toDoTasks];
    const taskIndex = updatedTaskList.findIndex((task) => task.id === id);
    updatedTaskList[taskIndex].isTaskDone = !updatedTaskList[taskIndex].isTaskDone;
    setToDoTasks(updatedTaskList);
    console.log("Task checked");
  }, [toDoTasks,setToDoTasks]);

  const onTaskUpdate = useCallback((id, event) => {
    const updatedTaskList = [...toDoTasks];
    const taskIndex = updatedTaskList.findIndex((task) => task.id === id);
    updatedTaskList[taskIndex].taskName = event.target.value;
    setToDoTasks(updatedTaskList);
    console.log("Task updated");
  }, [toDoTasks,setToDoTasks]);

  const filterTasks = useCallback(() => {
    if (filter === "active") {
      return toDoTasks.filter(task => !task.isTaskDone);
    } else if (filter === "completed") {
      return toDoTasks.filter(task => task.isTaskDone);
    }
    return toDoTasks;
  }, [toDoTasks, filter]);

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const listItems = filterTasks().map((task) => (
    <TaskComponent
      key={task.id}
      task={task}
      onDelete={onDeleteHandler}
      onTaskDone={isTaskDoneHandler}
      onUpdate={onTaskUpdate}
    />
  ));
  console.log(toDoTasks)

  return (
    <div className="mainDiv">
      <h2>To Do List</h2>
      <AddTask addTask={addTaskHandler} />
      <div className='filter-div'>
        <button className='btn-style filter' onClick={()=>handleFilterChange("all")}>All Tasks</button>
        <button className='btn-style filter' onClick={()=>handleFilterChange("active")}>Active</button>
        <button className='btn-style filter' onClick={()=>handleFilterChange("completed")}>Completed</button>
      </div>
      <ul>
        {listItems}
      </ul>
    </div>
  );
}

export default ParentComponent;
