import React from 'react'
import { useState , useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function AddTask({ addTask }) {
    const { theme } = useContext(ThemeContext);
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const handleAddTask = () => {
        addTask(value);
        setValue('');
    }
    return (
        <div className={`addTaskDiv ${theme}`}>
            <input type='text' placeholder='Add a Task' value={value} onChange={handleChange} />
            <button className={`btn-style ${theme}`} onClick={handleAddTask}>Add</button>
        </div>
    );
}
export default AddTask;