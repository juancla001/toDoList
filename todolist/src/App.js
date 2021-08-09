import React, {useState, useEffect} from 'react';
import {TaskRow} from './components/TaskRow';
import {TaskBanner} from './components/TaskBanner';
import {TaskCreator} from './components/TaskCreator';
import {VisibilityControl} from './components/VisibilityControl';


function App() {

  const [userName, setUserName] = useState('Juc')
  const [taskItems, setTaskItems] = useState([
    {name: 'study', done: false},
    {name: 'work', done: false},
    {name: 'code', done: true},
    {name: 'repeat', done: false},
  ]);

  const [showCompleted, setShowCompleted] = useState(true)
  
  useEffect(() =>{
    let data = localStorage.getItem('task')
    if(data != null){
      setTaskItems(JSON.parse(data));
    }else{
      setUserName('juc example')
      setTaskItems([
        {name: 'task one', done: false},
        {name: 'task two', done: false},
        {name: 'task three', done: true},
        {name: 'task four', done: false},
      ])
      setShowCompleted(true);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem('task', JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = taskName =>{
    if(!taskItems.find(tsk=> tsk.name === taskName)){
      setTaskItems([...taskItems, {name: taskName, done:false}])
    }
  }

//check manejo de tareas realizadas
  const toggleTask = task =>
    setTaskItems(taskItems.map(tsk => (tsk.name === task.name ? {...tsk, done: !tsk.done}: tsk )))

const taskTableRows = (doneValue)=> 
    taskItems
    .filter(task => task.done === doneValue)
    .map(task=>(
      <TaskRow task={task} 
        key={task.name} 
        toggleTask={toggleTask} 
      />
    ))

  return (
    <>
    <TaskBanner userName={userName} taskItems={taskItems} />
    <TaskCreator callback={createNewTask} />
      <table className= "table table-striped table-border">
        <thead>
          <tr>
            <th>To Do</th>
            <th>Check</th>
          </tr>
        </thead>
          <tbody>
            {taskTableRows(false)}
          </tbody>
      </table>
      <div className="bg-secondary-text-white p-2">
        <VisibilityControl
          description="Complete Task"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)} 
        />
      </div>
    {
      showCompleted && (
        <table className="table table-stripled table-bordered">
          <thead>
            <tr>
              <th>Ready</th>
              <th>Check</th>
            </tr>
          </thead>
          <tbody>
            {taskTableRows(true)}
          </tbody>
        </table>
      )
    }


    </>
  );
}

export default App;
