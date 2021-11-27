import { useState } from 'react';
import TaskInput from './TaskInput.js';

function ToDoForm() {
  const [tasks, setTasks] = useState([]);

  const taskListItems = tasks.map((task, index) =>
      <li key={index}>{task}</li>
  );

  return (
      <div>
        <TaskInput tasks={tasks} setTasks={setTasks} />
        <div>
          <ul>
            {taskListItems}
          </ul>
        </div>
      </div>
  );
}

export default ToDoForm;
