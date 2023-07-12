import React, { useState, useCallback, useReducer,useContext } from 'react';
import AddTask from './AddTask';
import TaskComponent from './TaskComponent';
import FilterComponent from './FilterComponent';
import { ThemeContext } from './ThemeContext';

const initialState = [{ id: 43, taskName: "Wash clothes", isTaskDone: true }, { id: 765, taskName: "Dress up", isTaskDone: true }];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      if (action.value === '') {
        alert('Fill the input box to add a task');
        return state;
      } else {
        const newObj = { id: Math.floor(Math.random() * 1000 + 1), taskName: action.value, isTaskDone: false };
        return [...state, newObj];
      }
    case "DELETE_TASK":
      return state.filter(task => task.id !== action.id);
    case "UPDATE_TASK":
      return state.map(task => {
        if (task.id === action.id) {
          return { ...task, taskName: action.value };
        }
        return task;
      });
    case "TASK_DONE":
      return state.map(task => {
        if (task.id === action.id) {
          return { ...task, isTaskDone: !task.isTaskDone };
        }
        return task;
      });
    default:
      return state;
  }
}

function ParentComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const addTaskHandler = useCallback((value) => {
    dispatch({ type: "ADD_TASK", value: value })
  }, []);

  const onDeleteHandler = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", id: id })
  }, []);

  const isTaskDoneHandler = useCallback((id) => {
    dispatch({ type: "TASK_DONE", id: id })
  }, []);

  const onTaskUpdate = useCallback((id, value) => {
    dispatch({ type: "UPDATE_TASK", id: id, value:value })
  }, []);

  const handleFilterChange = useCallback((filterValue) => {
    setFilter(filterValue);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  const filterTasks = useCallback(() => {
    let filteredTasks = state;

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
  }, [filter, state, searchText]);

  const listItems = filterTasks().map(task => (
    <TaskComponent
      key={task.id}
      task={task}
      onDelete={onDeleteHandler}
      onTaskDone={isTaskDoneHandler}
      onUpdate={onTaskUpdate}
    />
  ));

  console.log(state);

  return (
      <div className={`mainDiv ${theme}`}>
      <h2>To Do List</h2>
      <button onClick={toggleTheme} className={`btn-style ${theme} filter`}>Theme</button>
      <AddTask addTask={addTaskHandler} />
      <FilterComponent filteredValue={handleFilterChange} onSearchChange={handleSearchChange} />
      <ul>{listItems}</ul>
    </div>
  );
}

export default ParentComponent;
