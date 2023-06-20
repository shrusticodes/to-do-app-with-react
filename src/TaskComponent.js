import React from 'react'
export default function TaskComponent({task, onDelete, isTaskDone, onUpdate}) {
    const {id, taskName, onCheck} = task;
    const handleOnDelete=()=>{
        onDelete(id);
    }
    const handleChange = ()=>{
        isTaskDone(id);
    }
    const handleOnUpdate = (event) =>{
        onUpdate(id,event);
    }
    return (
        <li>
            <input type='checkbox' checked={onCheck} onChange={handleChange} />
            <input type="text" value={taskName} onChange={handleOnUpdate}/>
            <button className="btn-style" onClick={handleOnDelete}>Delete</button>
        </li>
    );
}