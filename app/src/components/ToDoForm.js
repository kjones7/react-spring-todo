import { useState } from 'react';
import TaskInput from './TaskInput.js';

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
        <TaskInput addTaskHandler={addTask} />
        <div>
          <ul>
            {taskListItems}
          </ul>
        </div>
      </div>
  );
}

export default ToDoForm;
