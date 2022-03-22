import React from 'react';
import {useEffect, useState} from 'react';
import TaskInput from './TaskInput.js';

/**
 * Components that represents that to-do form
 * @returns {JSX.Element}
 */
function ToDoForm() {
  const [tasks, setTasks] = useState([]);
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

  const handleCheckboxClick = function(e) {
    e.preventDefault();

    const checkbox = e.target;
    const taskListEl = checkbox.closest('tr');
    const indexOfTask = [...taskListEl.parentElement.children].indexOf(taskListEl);
    const taskCompleted = (checkbox.checked === true);

    if (taskCompleted) {
      const task = tasks[indexOfTask];
      setCompletedTasks([...completedTasks, task]);
      const newTasks = tasks.filter((activeTask, i) => i !== indexOfTask);
      setTasks(newTasks);
    } else {
      const task = completedTasks[indexOfTask];
      setTasks([...tasks, task]);
      const newCompletedTasks = completedTasks.filter((completedTask, i) => i !== indexOfTask);
      setCompletedTasks(newCompletedTasks);
    }
  }

  const handleRemove = function(e) {
    const removeBtn = e.target;
    const taskRow = removeBtn.closest('tr');
    const indexOfTaskToRemove = [...taskRow.parentElement.querySelectorAll('tr')].indexOf(taskRow);

    const newTasks = tasks.filter((task, i) => i !== indexOfTaskToRemove);
    setTasks(newTasks);
  }

  const taskListItems = tasks.map((task, index) =>
      <tr key={index}>
        <td><input type="checkbox" onClick={handleCheckboxClick}/></td>
        <td>
          {task}
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
        <td>{completedTask}</td>
      </tr>
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
