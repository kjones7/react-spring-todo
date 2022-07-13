import React from 'react';

function TaskInput(props) {
  const handleSubmit = function(e) {
    let taskInput = e.target.querySelector('.add-task-input');
    let taskDesc = taskInput.value;

    e.preventDefault();

    props.addTask(taskDesc);

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
