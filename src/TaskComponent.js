import React, {useState,useContext} from 'react'
import Popup from 'reactjs-popup';
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
    const [value, setValue] = useState('');
    const handleEditValueChange = (event) => {
        setValue(event.target.value);
    }
    const handleOnUpdate = () => {
        console.log(value);
        onUpdate(id, value);
       
    }
    // const handleOnUpdate = (event) => {
    //     onUpdate(id, event);
    // }
    return (
        <li>
            <input type='checkbox' checked={isTaskDone} onChange={handleChange} />
            <div style={{width:"200px", color:"black"}}>{taskName}</div>
            <button className={`btn-style ${theme}`} onClick={handleOnDelete}><i className= "fa fa-trash"/></button>
            <Popup contentStyle={{backgroundColor: "white", border:"2px solid black", padding:'20px', borderRadius:'5px'}} trigger=
                {<button className={`btn-style ${theme}`}><i className="fas fa-edit"/></button>}
                position="right center">
                 <input type="text" placeholder='Enter the task' onChange={handleEditValueChange}/>
                <button className={`btn-style ${theme}`} onClick={handleOnUpdate}>Update</button>
            </Popup>
        </li>
    );
}
export default TaskComponent;