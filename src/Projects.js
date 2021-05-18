const Project = (title, description, dueDate, priority) => {
    
    const dateAdded = new Date(Date.now());

    const todoItems = [];


    return { title, description, dueDate, priority, dateAdded, todoItems }
}

export default Project