let ID = 0;

const Project = (title, description, dueDate, priority) => {
    
    const dateAdded = new Date(Date.now());

    const projectID = ID++;
    const getProjectID = () => projectID;

    const todoTasks = [];

    function getTodoTasks() {
        return todoTasks;
    }

    function addTodoTask(task) {
        todoTasks.push(task);
    }

    function removeTodoTask(task) {
        let id = task.getTaskID();
        let index = todoTask.findIndex(task => task.getTaskID() === id)
        todoTasks.splice(index, 1);
    }


    return { title, description, dueDate, priority, dateAdded, getProjectID, getTodoTasks, addTodoTask, removeTodoTask }
}

export default Project