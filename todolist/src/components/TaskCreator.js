import React, {useState} from 'react'

export const TaskCreator = (props) => {
    const [newTaskName, setNewTaskName] = useState('');
    const updateNewTaskValue = e => setNewTaskName(e.target.value); //esto me permite actualizar el estado de la nueva tarea
    const createNewTask = () =>{
        props.callback(newTaskName);
        setNewTaskName('');//me vuelva a poner el input en blanco
    }

    return (
        <div className="my-1">
            <input
                type="text"
                className="form-control"
                value={newTaskName}
                onChange={updateNewTaskValue}
            />
        <button className="btn btn-primary mt-1" onClick={createNewTask}>
        ADD
        </button>
        </div>
    )
};
