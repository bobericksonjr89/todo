import { add, format, isYesterday, isPast, isToday, isTomorrow, isSunday, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isWithinInterval } from 'date-fns';

let ID = 0;

const Task = (title, description, priority, dueDate, 
  taskID = ID,
  isComplete = false,
  dateAdded = new Date(Date.now())) => {
  ID += 1;

  if (typeof dateAdded === 'string') {
    dateAdded = new Date(dateAdded);
  }

  if (typeof dueDate === 'string') {
    dueDate = new Date(dueDate);
  }

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
      return 'Yesterday';
    } if (isPast(dueDate)) {
      return 'Past Due';
    } if (isToday(dueDate)) {
      return 'Today';
    } if (isTomorrow(dueDate)) {
      return 'Tomorrow';
    } if (isWithinInterval(dueDate, {
      start: new Date(Date.now()),
      end: sevenDaysLater,
    })) {
      if (isSunday(dueDate)) return 'Sunday';
      if (isMonday(dueDate)) return 'Monday';
      if (isTuesday(dueDate)) return 'Tuesday';
      if (isWednesday(dueDate)) return 'Wednesday';
      if (isThursday(dueDate)) return 'Thursday';
      if (isFriday(dueDate)) return 'Friday';
      if (isSaturday(dueDate)) return 'Saturday';
    }
    return format(dueDate, "MMM do',' yyyy");
  }

  function parseDateAdded() {
    return format(dateAdded, "MMM do',' yyyy");
  }

  return {
    title,
    description,
    priority,
    dueDate,
    taskID,
    isComplete,
    dateAdded,
    toggleCompletionStatus,
    parseDueDate,
    parseDateAdded,
  };
};

export default Task;
