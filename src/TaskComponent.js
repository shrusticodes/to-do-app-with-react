import React from 'react'

function TaskComponent({ task, onDelete, onTaskDone, onUpdate }) {
    const { id, taskName, isTaskDone } = task;
    const handleOnDelete = () => {
        onDelete(id);
    }
    const handleChange = () => {
        onTaskDone(id);
    }
    const handleOnUpdate = (event) => {
        onUpdate(id, event);
    }
    return (
        <li>
            <input type='checkbox' checked={isTaskDone} onChange={handleChange} />
            <input type="text" value={taskName} onChange={handleOnUpdate} />
            <button className="btn-style" onClick={handleOnDelete}>Delete</button>
        </li>
    );
}
export default TaskComponent;