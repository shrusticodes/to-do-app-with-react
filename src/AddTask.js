import React from 'react'
import { useState } from 'react';

function AddTask({ addTask }) {
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const handleAddTask = () => {
        addTask(value);
        setValue('');
    }
    return (
        <div className='addTaskDiv'>
            <input type='text' placeholder='Add Task' value={value} onChange={handleChange} />
            <button className="btn-style" onClick={handleAddTask}>Add</button>
        </div>
    );
}
export default AddTask;