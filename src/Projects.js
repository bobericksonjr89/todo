let ID = 0;

const Project = (title, description) => {

    const projectID = ID++;
    const getProjectID = () => projectID;

    const todoTasks = [];

    const getTitle = () => title;

    const getDescription = () => description;

    function getTodoTasks() {
        return todoTasks;
    }

    function addTodoTask(task) {
        todoTasks.push(task);
    }

    function removeTodoTask(task) {
        let id = task.getTaskID();
        let index = todoTasks.findIndex(task => task.getTaskID() === id)
        todoTasks.splice(index, 1);
    }


    return { getTitle, getDescription, getProjectID, getTodoTasks, addTodoTask, removeTodoTask }
}

export default Project