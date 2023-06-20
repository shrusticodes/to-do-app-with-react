import React from 'react'
export default function TaskComponent(){
    return(
        <li>
                <input type='checkbox' /*checked={isChecked} onChange={handleChange}*/ />
                <input type="text" /*value={taskName} onChange={handleOnUpdate}*/ />
                <button className="btn-style" /*onClick={handleOnDelete}*/>Delete</button>
        </li>
    );
}