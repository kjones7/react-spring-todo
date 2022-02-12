import React from 'react';
import {useEffect, useState} from 'react';
import TaskInput from './TaskInput.js';

/**
 * Components that represents that to-do form
 * @returns {JSX.Element}
 */
function ToDoForm() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch to-do tasks
  useEffect(() => {
    fetch("http://localhost:8080/demo/all")
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
              let tasks = [];
              for (const [key, taskJSON] of Object.entries(result)) {
                tasks.push(taskJSON.description);
              }
              setTasks(tasks);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
  }, [])

  const taskListItems = tasks.map((task, index) =>
      <li key={index}>{task}</li>
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
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
}

export default ToDoForm;
