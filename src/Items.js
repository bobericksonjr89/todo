const Item = (title, description, dueDate, priority) => {

    const dateAdded = new Date(Date.now());

    return { title, description, dueDate, priority, dateAdded }
} 

export default Item