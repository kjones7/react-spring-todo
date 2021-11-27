function TaskInput(props) {
  let addTask = function(e) {
    let taskInput = e.target.querySelector('.add-task-input');
    let task = taskInput.value;

    e.preventDefault();

    props.setTasks([...props.tasks, task]);

    // Reset input
    taskInput.value = '';
  }

  return (
      <form onSubmit={addTask}>
        <label>Task</label>
        <input className="add-task-input"/>
        <button>Add</button>
      </form>
  );
}

export default TaskInput;
