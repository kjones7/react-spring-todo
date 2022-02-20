import React from 'react';

/**
 * Component used to add task to the to-do list
 * @param {Object} props - Props
 * @param {function} props.setTasks - State function used to set the to-do list's tasks
 * @param {string[]} props.tasks - The existing tasks in the to-do list
 * @returns {JSX.Element}
 */
function TaskInput(props) {
  /**
   * Adds the task from the input to the to-do list
   * @param {Event} e - DOM event from input that added task
   */
  let addTask = function(e) {
    let taskInput = e.target.querySelector('.add-task-input');
    let task = taskInput.value;

    e.preventDefault();

    props.setTasks([...props.tasks, task]);

    // Reset input
    taskInput.value = '';

    // Fetch to-do tasks
    fetch("http://localhost:8080/demo/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({description: task}),
    })
        .then(res => res.json())
        .then((results) => {
          if (results.error) {
            console.error(results.error);
          }
        });
  }

  return (
      <form onSubmit={addTask}>
        <label>Task</label>
        <input className="add-task-input"/>
        <button className="add-btn">Add</button>
      </form>
  );
}

export default TaskInput;
