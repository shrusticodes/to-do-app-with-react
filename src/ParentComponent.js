import React, { useState, useCallback } from 'react';
import AddTask from './AddTask';
import TaskComponent from './TaskComponent';
import FilterComponent from './FilterComponent';

function ParentComponent() {
  const [toDoTasks, setToDoTasks] = useState([{id:43, taskName:"Wash clothes", isTaskDone: true},{id:765, taskName:"Dress up", isTaskDone:true}]);
  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const addTaskHandler = useCallback((value) => {
    if (value === '') {
      alert('Fill the input box to add a task');
    } else {
      const updatedTaskList = [...toDoTasks];
      const newObj = { id: Math.floor(Math.random() * 1000 + 1), taskName: value, isTaskDone: false };
      updatedTaskList.push(newObj);
      setToDoTasks(updatedTaskList);
      console.log('Task added');
    }
  }, [toDoTasks]);

  const onDeleteHandler = useCallback((id) => {
    const updatedTaskList = toDoTasks.filter(task => task.id !== id);
    setToDoTasks(updatedTaskList);
    console.log('Task deleted');
  }, [toDoTasks]);

  const isTaskDoneHandler = useCallback((id) => {
    const updatedTaskList = [...toDoTasks];
    const taskIndex = updatedTaskList.findIndex(task => task.id === id);
    updatedTaskList[taskIndex].isTaskDone = !updatedTaskList[taskIndex].isTaskDone;
    setToDoTasks(updatedTaskList);
    console.log('Task checked');
  }, [toDoTasks]);

  const onTaskUpdate = useCallback((id, event) => {
    const updatedTaskList = [...toDoTasks];
    const taskIndex = updatedTaskList.findIndex(task => task.id === id);
    updatedTaskList[taskIndex].taskName = event.target.value;
    setToDoTasks(updatedTaskList);
    console.log('Task updated');
  }, [toDoTasks]);

  const handleFilterChange = useCallback((filterValue) => {
    setFilter(filterValue);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  const filterTasks = useCallback(() => {
    let filteredTasks = toDoTasks;

    if (filter === 'active') {
      filteredTasks = filteredTasks.filter(task => !task.isTaskDone);
    } else if (filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.isTaskDone);
    }

    if (searchText !== '') {
      const searchQuery = searchText.toLowerCase();
      filteredTasks = filteredTasks.filter(task => task.taskName.toLowerCase().includes(searchQuery));
    }

    return filteredTasks;
  }, [filter, toDoTasks, searchText]);

  const listItems = filterTasks().map(task => (
    <TaskComponent
      key={task.id}
      task={task}
      onDelete={onDeleteHandler}
      onTaskDone={isTaskDoneHandler}
      onUpdate={onTaskUpdate}
    />
  ));

  console.log(toDoTasks);

  return (
    <div className="mainDiv">
      <h2>To Do List</h2>
      <AddTask addTask={addTaskHandler} />
      <FilterComponent filteredValue={handleFilterChange} onSearchChange={handleSearchChange} />
      <ul>{listItems}</ul>
    </div>
  );
}

export default ParentComponent;
