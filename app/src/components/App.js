import '../App.css';
import { useState } from 'react';

function App() {
  return (
      <ToDoForm/>
  );
}

function ToDoForm() {
  const [tasks, setTasks] = useState([]);

  let addTask = function(e) {
    let task = e.target.querySelector('.add-task-input').value;

    e.preventDefault();

    setTasks([...tasks, task]);
  }

  const taskListItems = tasks.map((task, index) =>
    <li key={index}>{task}</li>
  );

  return (
      <div>
        <form onSubmit={addTask}>
          <label>Task</label>
          <input className="add-task-input"/>
          <button>Add</button>
        </form>
        <div>
          <ul>
            {taskListItems}
          </ul>
        </div>
      </div>
  );
}

export default App;
