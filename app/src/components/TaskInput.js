function TaskInput(props) {
  return (
      <form onSubmit={props.addTaskHandler}>
        <label>Task</label>
        <input className="add-task-input"/>
        <button>Add</button>
      </form>
  );
}

export default TaskInput;
