let ID = 0;

const Project = (title, description,
  projectID = ID,
  todoTasks = []) => {
  ID += 1;

  function addTodoTask(task) {
    todoTasks.push(task);
  }

  function removeTodoTask(task) {
    const id = task.taskID;
    const index = todoTasks.findIndex((task) => task.taskID === id);
    todoTasks.splice(index, 1);
  }

  return {
    title, description, projectID, todoTasks, addTodoTask, removeTodoTask,
  };
};

export default Project;
