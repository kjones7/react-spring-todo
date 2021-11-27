function TaskInput(props) {
  let addTask = function(e) {
    let task = e.target.querySelector('.add-task-input').value;

    e.preventDefault();

    props.setTasks([...props.tasks, task]);
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
