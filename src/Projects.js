let ID = 0;

const Project = (title, description,
                    projectID = ID,
                    todoTasks = []) => {
    ID++;

    function addTodoTask(task) {
        todoTasks.push(task);
    }

    function removeTodoTask(task) {
        let id = task.taskID;
        let index = todoTasks.findIndex(task => task.taskID === id)
        todoTasks.splice(index, 1);
    }


    return { title, description, projectID, todoTasks, addTodoTask, removeTodoTask }
}

export default Project