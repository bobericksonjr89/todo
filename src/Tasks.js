let ID = 0;

const Task = (title, description, dueDate, priority) => {

    const dateAdded = new Date(Date.now());
    
    const taskID = ID++;
    const getTaskID = () => TaskID;

    let isComplete = false;
    function toggleCompletionStatus() {
        if (this.isComplete === false) {
            this.isComplete = true;
        } else {
            this.isComplete = false;
        }
        return this;
    }

    return { title, description, dueDate, priority, dateAdded, getTaskID, isComplete, toggleCompletionStatus }
} 

export default Task