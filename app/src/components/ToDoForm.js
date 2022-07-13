import React from 'react';
import {useEffect, useState} from 'react';
import TaskInput from './TaskInput.js';

/**
 * A task on the to-do list
 * @typedef {Object} Task
 * @property {string} description - Task description
 */

/**
 * Components that represents that to-do form
 * @returns {JSX.Element}
 */
function ToDoForm() {
  /** @type {Task[]} */
  const initialTasks = [];
  const [tasks, setTasks] = useState(initialTasks);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch to-do tasks
  useEffect(() => {
    fetch("http://localhost:8080/demo/all")
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
              /** @type Task[] */
              let tasks = [];
              for (const [key, taskJSON] of Object.entries(result)) {
                tasks.push({
                  description: taskJSON.description,
                });
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

  const handleCheckboxClick = function(e) {
    e.preventDefault();

    const checkbox = e.target;
    const taskListEl = checkbox.closest('tr');
    const indexOfTask = [...taskListEl.parentElement.children].indexOf(taskListEl);
    const taskCompleted = (checkbox.checked === true);

    if (taskCompleted) {
      /** @type Task */
      const task = tasks[indexOfTask];
      setCompletedTasks([...completedTasks, task]);
      /** @type Task[] */
      const newTasks = tasks.filter((activeTask, i) => i !== indexOfTask);
      setTasks(newTasks);
    } else {
      /** @type Task */
      const task = completedTasks[indexOfTask];
      setTasks([...tasks, task]);
      /** @type Task[] */
      const newCompletedTasks = completedTasks.filter((completedTask, i) => i !== indexOfTask);
      setCompletedTasks(newCompletedTasks);
    }
  }

  const handleRemove = function(e) {
    const removeBtn = e.target;
    const taskRow = removeBtn.closest('tr');
    const indexOfTaskToRemove = [...taskRow.parentElement.querySelectorAll('tr')].indexOf(taskRow);

    /** @type Task[] */
    const newTasks = tasks.filter((task, i) => i !== indexOfTaskToRemove);
    setTasks(newTasks);
  }

  const taskListItems = tasks.map((task, index) =>
      <tr key={index}>
        <td><input type="checkbox" onClick={handleCheckboxClick}/></td>
        <td>
          {task.description}
        </td>
        <td className="task-table-btns">
          <button type="button" className="edit-task btn btn-sm btn-outline-primary"><i className="bi bi-pencil"></i></button>
          <button
              type="button"
              className="remove-task btn btn-sm btn-outline-danger"
              onClick={handleRemove}>
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>
  );

  const completedTaskListItems = completedTasks.map((completedTask, index) =>
      <tr key={index}>
        <td><input type="checkbox" onClick={handleCheckboxClick} defaultChecked={true} /></td>
        <td>{completedTask.description}</td>
      </tr>
  );

  /**
   * Adds a task to the to-do list
   * @param {string} taskDesc - Task description
   */
  let addTask = function(taskDesc) {
    /** @type {Task} */
    let newTask = {description: taskDesc};
    setTasks([...tasks, newTask]);

    // Fetch to-do tasks
    fetch("http://localhost:8080/demo/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({description: taskDesc}),
    })
        .then(res => res.json())
        .then((results) => {
          if (results.error) {
            console.error(results.error);
          }
        });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div>
          <TaskInput addTask={addTask} />
          <div>
            <table className="task-table">
              <tbody>{taskListItems}</tbody>
            </table>
          </div>
          <div>
            <strong>Completed Tasks</strong>
            <table>
              <tbody>{completedTaskListItems}</tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default ToDoForm;
