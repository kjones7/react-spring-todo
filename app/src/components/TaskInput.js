import React from 'react';

function TaskInput(props) {
  const handleSubmit = function(e) {
    let taskInput = e.target.querySelector('.add-task-input');
    let task = taskInput.value;

    e.preventDefault();

    props.addTask(task);

    // Reset input
    taskInput.value = '';
  }

  return (
      <form onSubmit={handleSubmit}>
        <label>Task</label>
        <input className="add-task-input"/>
        <button className="add-btn">Add</button>
      </form>
  );
}

export default TaskInput;
