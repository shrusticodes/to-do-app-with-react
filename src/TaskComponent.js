import React, {useContext} from 'react'
import { ThemeContext } from './ThemeContext';
function TaskComponent({ task, onDelete, onTaskDone, onUpdate }) {
    const { id, taskName, isTaskDone } = task;
    const {theme} = useContext(ThemeContext);
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
            <button className={`btn-style ${theme}`} onClick={handleOnDelete}>Delete</button>
        </li>
    );
}
export default TaskComponent;