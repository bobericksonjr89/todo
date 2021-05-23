import { add, format, isYesterday, isPast, isToday, isTomorrow, isSunday, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isWithinInterval } from 'date-fns';

let ID = 0;

const Task = (title, description, dueDate, priority) => {

    const dateAdded = new Date(Date.now());
    
    const taskID = ID++;
    const getTaskID = () => taskID;

    let isComplete = false;
    function toggleCompletionStatus() {
        if (this.isComplete === false) {
            this.isComplete = true;
        } else {
            this.isComplete = false;
        }
        return this;
    }

    function parseDueDate() {
        const sevenDaysLater = add(new Date(Date.now()), {
            days: 7,
        });

        if (isYesterday(dueDate)) {
            return "Yesterday";
        } else if (isPast(dueDate)) {
            return "Past Due";
        } else if (isToday(dueDate)) {
            return "Today";
        } else if (isTomorrow(dueDate)) {
            return "Tomorrow";
        } else if (isWithinInterval(dueDate, {
            start: new Date(Date.now()),
            end: sevenDaysLater
            })) { 
            if (isSunday(dueDate)) return "Sunday";
            if (isMonday(dueDate)) return "Monday";
            if (isTuesday(dueDate)) return "Tuesday";
            if (isWednesday(dueDate)) return "Wednesday";
            if (isThursday(dueDate)) return "Thursday";
            if (isFriday(dueDate)) return "Friday";
            if (isSaturday(dueDate)) return "Saturday";
        }
        return format(dueDate, "MMM do',' yyyy");
    }

    function parseDateAdded() {
        return format(dateAdded, "MMM do',' yyyy");
    }

    return { title, description, priority, dateAdded, getTaskID, isComplete, toggleCompletionStatus, parseDueDate, parseDateAdded }
} 

export default Task