import Task from './Tasks';
import Project from './Projects';
import DOM from './domController.js';

import { parseISO } from 'date-fns';



const App = (() => {


    
    const tasks = [];
    window.tasks = tasks;
    const projects = [];
    window.projects = projects;

    if (!localStorage.getItem('projects')) {
        const item1 = Task("clean", "clean the whole house", "1", new Date('May 30, 2021 23:15:30'));
        window.item1 = item1;
        tasks.push(item1);

        const item2 = Task("work", "work hard", "2", new Date('May 23, 2021 23:15:30'));
        window.item2 = item2;
        tasks.push(item2);

        const item3 = Task("study", "study goooood", "3", new Date('May 26, 2021 23:15:30'));
        window.item3 = item3;
        tasks.push(item3);

        const item4 = Task("harvest spinach", "spinach is fully mature and needs to be harvested", "2", new Date('May 26, 2021 23:15:30'));
        window.item4 = item4;
        tasks.push(item4);

        const item5 = Task("plant tomatoes", "plant tomatoes where the spinach was growing (don't forget to add fertilizer!)", "1", new Date('May 26, 2021 23:15:30'));
        window.item5 = item5;
        tasks.push(item5);

        const proj1 = Project("House Chores", "daily house chores to be done Monday-Friday, twice a day, and without fail.");
        window.proj1 = proj1;
        proj1.addTodoTask(item1);
        proj1.addTodoTask(item2);
        projects.push(proj1);

        const proj2 = Project("Make Todo App", "work on it every day");
        window.proj2 = proj2;
        proj2.addTodoTask(item3);
        projects.push(proj2);

        const proj3 = Project('Third Project', "do it good");
        projects.push(proj3);
        window.projects = projects;

        if (storageAvailable('localStorage')) {
            saveTaskToStorage();
            saveProjectToStorage();
        }
    } else {
        const storedTasks = getTasksFromStorage();
        window.storedTasks = storedTasks;
        storedTasks.forEach((task) => {
            const newTask = Task(...Object.values(task));
            tasks.push(newTask);
        });

        const storedProjects = getProjectsFromStorage();
        storedProjects.forEach((project) => {
            const projectTasks = project.todoTasks;
            project.todoTasks = [];

            projectTasks.forEach((task) => {
                project.todoTasks.push(tasks.find(item => item.taskID === task.taskID));
            });
            const newProject = Project(...Object.values(project));

            projects.push(newProject)
        });
        
    }

    // init
    DOM.displayTasksPage(tasks);
    captureButtons();

    // DOM capture
    const allTasksLink = document.querySelector('.sidebar__tasks');
    const projectsLink = document.querySelector('.sidebar__projects');
    const newTaskLink = document.querySelector('.header__new-task-link')
    const newProjectLink = document.querySelector('.header__new-project-link');


    // Event Handlers
    allTasksLink.addEventListener('click', readyAllTasks);
    projectsLink.addEventListener('click', readyProjects);
    newTaskLink.addEventListener('click', readyNewTask);
    newProjectLink.addEventListener('click', readyNewProject);


    // functions
    function captureButtons() {
        const deleteButtons = document.querySelectorAll('.task__delete');
        deleteButtons.forEach(button => button.addEventListener('click', function() {
            confirmDeletion(button);
        }));

        const completionButtons = document.querySelectorAll('.task__checkmark');
        completionButtons.forEach(button => button.addEventListener('click', function() {
            toggleCompletion(button);
        }));
        completionButtons.forEach(button => button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                button.click();
            }
        }))

        const taskTitles = document.querySelectorAll('.task__title');
        taskTitles.forEach(button => button.addEventListener('click', function (){
            readyTaskView(button);
        }));
        taskTitles.forEach(button => button.addEventListener('keypress', function(e){
            if (e.key === 'Enter') {
                button.click();
            }
        }))
        
        const taskDueDates = document.querySelectorAll('.task__due-date');
        taskDueDates.forEach(button => button.addEventListener('click', function() {
            readyTaskView(button);
        }));
    }

    function readyTaskView(button) {
        const taskID = button.dataset.id;
        const task = tasks.find(task => task.taskID === parseInt(taskID));
        DOM.taskView(button, task);
        window.setTimeout(function() {
            captureEditButton(task, taskID);
        }, 200);
    }


    function captureEditButton(task, taskID) {
        const editButton = document.querySelector(`.task__edit[data-id='${taskID}']`);
        if (!editButton) {
            return;
        }
        editButton.addEventListener('click', function() {
            DOM.clearMainContent();
            DOM.taskForm(projects, task);
            document.querySelector('.task-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const form = document.querySelector('.task-form');
                const data = new FormData(form);
                saveTaskEdit(data, task);
                DOM.clearMainContent();
                DOM.displayTasksPage(tasks);
                captureButtons();
                if (storageAvailable('localStorage')) {
                    saveTaskToStorage();
                  }
            });
        });
    }

    function saveTaskEdit(data, task) {
        const dateAdded = task.dateAdded;
        const taskID = task.taskID;
        const isComplete = task.isComplete;
        const title = data.get('title');
        const description = data.get('description');
        const project = data.get('project');
        const priority = data.get('priority');
        const dueDate = parseISO(data.get('due-date'));

        deleteTaskFromProjects(task.taskID);
        deleteTask(task.taskID);

        const newTask = Task(title, description, priority, dueDate, taskID, isComplete, dateAdded);

        tasks.push(newTask);
        
        pushToProject(newTask, project);
    }

    function readyAllTasks() {
        if (projectsLink.parentElement.className.includes('sidebar--active')) {
            DOM.clearProjectsList();
            DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
        }
        DOM.clearMainContent();
        DOM.displayTasksPage(tasks);
        captureButtons();
    }

    function readyProjects() {
        if (projectsLink.parentElement.className.includes('sidebar--active')) {
            DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
            DOM.clearProjectsList();
            return;
        }
        DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
        DOM.displayProjects(projectsLink, projects);
    }

    function readyNewTask() {
        DOM.clearMainContent();
        DOM.taskForm(projects);
        document.querySelector('.task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const form = document.querySelector('.task-form');
            const data = new FormData(form);
            saveTask(data);
            DOM.clearMainContent();
            DOM.displayTasksPage(tasks);
            captureButtons();
        });
    }

    function saveTask(data) {
        const title = data.get('title');
        const description = data.get('description');
        const project = data.get('project');
        const priority = data.get('priority');
        const dueDate = parseISO(data.get('due-date'));

        const newTask = Task(title, description, priority, dueDate,);
        tasks.push(newTask);

        pushToProject(newTask, project);

        if (storageAvailable('localStorage')) {
            saveTaskToStorage();
            location.reload();
          }
    }

    function pushToProject(task, projectTitle) {
        if (projectTitle === '') return;
        const project = projects.find(project => project.title === projectTitle)
        project.addTodoTask(task);

        if (storageAvailable('localStorage')) {
            saveProjectToStorage();
          }
    }

    function readyNewProject() {
        DOM.clearMainContent();
        DOM.newProjectForm();
        document.querySelector('.project-form').addEventListener('submit', () => {
            const form = document.querySelector('.project-form');
            const data = new FormData(form);
            saveProject(data);
            DOM.clearMainContent();
            DOM.displayTasksPage(tasks);
            captureButtons();
        });
    }

    function saveProject(data) {
        const title = data.get('title');
        const description = data.get('description');

        const newProject = Project(title, description);
        projects.push(newProject);
        if (storageAvailable('localStorage')) {
            saveProjectToStorage();
          }
    }

    function toggleCompletion(button) {
        const taskID = button.dataset.id;
        const task = tasks.find(task => task.taskID === parseInt(taskID));
        task.toggleCompletionStatus();
        DOM.toggleCompletionIcon(button);
        if (storageAvailable('localStorage')) {
            saveTaskToStorage();
          }
    }

    function confirmDeletion(button) {
        if (confirm("You want to delete this task?")) {
            deleteTaskFromProjects(button.dataset.id);
            deleteTask(button.dataset.id);
            DOM.removeTask(button.parentElement.parentElement)
            if (storageAvailable('localStorage')) {
                saveTaskToStorage();
              }
        }
    }

    function deleteTask(taskID) { 
            const index = tasks.findIndex(task => task.taskID === parseInt(taskID));
            tasks.splice(index, 1);
    }

    function deleteTaskFromProjects(taskID) {
        const taskToDelete = tasks.find(task => task.taskID === parseInt(taskID));
        projects.forEach((project) => {
            if (project.todoTasks.includes(taskToDelete)) {
                project.removeTodoTask(taskToDelete);
                if (storageAvailable('localStorage')) {
                    saveProjectToStorage();
                }
            }
        });
    }

    function deleteProject(project) {
        confirmDeleteTasks(project);
        const index = projects.findIndex(item => item.projectID === project.projectID);
        projects.splice(index, 1);
        if (storageAvailable('localStorage')) {
            saveProjectToStorage();
        }
    }

    function confirmDeleteTasks(project) {
        if (confirm('Do you also want to delete its tasks?')) {
            const taskArray = project.todoTasks;
            taskArray.forEach(task => {
                deleteTask(task.taskID);
                if (storageAvailable('localStorage')) {
                    saveTaskToStorage();
                  }
            });
        }
    }
    

    function sortTasksByCompletionStatus(tasksToSort){
        return tasksToSort.slice().sort((a, b) => a.isComplete - b.isComplete);
    }

    function sortTasksByDueDate(tasksToSort) {
        return tasksToSort.slice().sort((a, b) => a.dueDate - b.dueDate);
    }

    function sortTasksByPriority(tasksToSort) {
        return tasksToSort.slice().sort((a, b) => b.priority - a.priority);
    }

    // From Mozilla Web Docs
    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }


    function getTasksFromStorage() {
        let storageTasks = JSON.parse(localStorage.getItem('tasks'));
        window.storageTasks = storageTasks;
        return storageTasks;
    }

    function getProjectsFromStorage() {
        let storageProjects = JSON.parse(localStorage.getItem('projects'));
        window.storageProjects = storageProjects;
        return storageProjects;
    }

    function saveProjectToStorage() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function saveTaskToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   /*  const storedLibrary = JSON.parse(localStorage.getObj('myLibrary'));

    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }
 */
    return { captureButtons, deleteProject, sortTasksByCompletionStatus, sortTasksByDueDate, sortTasksByPriority };

})();

export default App