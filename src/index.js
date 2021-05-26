import Task from './Tasks';
import Project from './Projects';
import DOM from './domController.js';

import { parseISO } from 'date-fns';



const App = (() => {

    const tasks = [];
    window.tasks = tasks;
    const projects = [];

    const item1 = Task("clean", "clean the whole house", new Date('May 30, 2021 23:15:30'), "1");
    window.item1 = item1;
    tasks.push(item1);

    const item2 = Task("work", "work hard", new Date('May 23, 2021 23:15:30'), "2");
    window.item2 = item2;
    tasks.push(item2);

    const item3 = Task("study", "daily house chores to be done Monday-Friday, twice a day, and without fail", new Date('May 26, 2021 23:15:30'), "3");
    window.item3 = item3;
    tasks.push(item3);

    const item4 = Task("harvest spinach", "spinach is fully mature and needs to be harvested", new Date('May 26, 2021 23:15:30'), "2");
    window.item4 = item4;
    tasks.push(item4);

    const item5 = Task("plant tomatoes", "plant tomatoes where the spinach was growing (don't forget to add fertilizer!)", new Date('May 26, 2021 23:15:30'), "1");
    window.item5 = item5;
    tasks.push(item5);

    const proj1 = Project("House Chores", "daily house chores to be done Monday-Friday, twice a day, and without fail.", "Friday");
    window.proj1 = proj1;
    proj1.addTodoTask(item1);
    proj1.addTodoTask(item2);
    projects.push(proj1);

    const proj2 = Project("Make Todo App", "work on it every day", "May 20th");
    window.proj2 = proj2;
    proj2.addTodoTask(item3);
    projects.push(proj2);

    const proj3 = Project('Third Project', "do it good", "Monday");
    projects.push(proj3);
    window.projects = projects;

    // init
    DOM.displaySortBar();
    DOM.displayTasks(tasks);
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
        const task = tasks.find(task => task.getTaskID() === parseInt(taskID));
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
            document.querySelector('.task-form').addEventListener('submit', function() {
                const form = document.querySelector('.task-form');
                const data = new FormData(form);
                console.log(data);
                saveTaskEdit(data, task);
                DOM.clearMainContent();
                DOM.displaySortBar();
                DOM.displayTasks(tasks);
                captureButtons();
            });
        });
    }

    function saveTaskEdit(data, task) {
        console.log(task);

        task.title = data.get('title');
        task.description = data.get('description');
        const project = data.get('project');
        task.priority = data.get('priority');
        task.dueDate = parseISO(data.get('due-date'));

        deleteTaskFromProjects(task.getTaskID());
        pushToProject(task, project);
    }

    function readyAllTasks() {
        if (!allTasksLink.className.includes('sidebar--active')) {
            DOM.toggleActiveStatus(allTasksLink, 'sidebar--active')
        }
        if (projectsLink.parentElement.className.includes('sidebar--active')) {
            DOM.clearProjectsList();
            DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
        }
        DOM.clearMainContent();
        DOM.displaySortBar();
        DOM.displayTasks(tasks);
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
            const form = document.querySelector('.task-form');
            const data = new FormData(form);
            saveTask(data);
            DOM.clearMainContent();
            DOM.displaySortBar();
            DOM.displayTasks(tasks);
            captureButtons();
        });
    }

    function saveTask(data) {
        const title = data.get('title');
        const description = data.get('description');
        const project = data.get('project');
        const priority = data.get('priority');
        const dueDate = parseISO(data.get('due-date'));

        const newTask = Task(title, description, dueDate, priority);
        tasks.push(newTask);

        pushToProject(newTask, project);
    }

    function pushToProject(task, projectTitle) {
        console.log(projectTitle);
        if (projectTitle === '') return;
        const project = projects.find(project => project.getTitle() === projectTitle)
        project.addTodoTask(task);
    }

    function readyNewProject() {
        DOM.clearMainContent();
        DOM.newProjectForm();
        document.querySelector('.project-form').addEventListener('submit', () => {
            const form = document.querySelector('.project-form');
            const data = new FormData(form);
            console.log(data.get('title'));
            saveProject(data);
            DOM.clearMainContent();
            DOM.displaySortBar();
            DOM.displayTasks(tasks);
            captureButtons();
        });
    }

    function saveProject(data) {
        const title = data.get('title');
        const description = data.get('description');

        const newProject = Project(title, description);
        projects.push(newProject);
    }

    function toggleCompletion(button) {
        const taskID = button.dataset.id;
        const task = tasks.find(task => task.getTaskID() === parseInt(taskID));
        task.toggleCompletionStatus();
        DOM.toggleCompletionIcon(button);
    }

    function confirmDeletion(button) {
        if (confirm("You want to delete this task?")) {
            deleteTaskFromProjects(button.dataset.id);
            deleteTask(button.dataset.id);
            DOM.removeTask(button.parentElement.parentElement);
        }
    }

    function deleteTask(taskID) { 
            const index = tasks.findIndex(task => task.getTaskID() === parseInt(taskID));
            tasks.splice(index, 1);
    }

    function deleteTaskFromProjects(taskID) {
        const taskToDelete = tasks.find(task => task.getTaskID() === parseInt(taskID));
        projects.forEach((project) => {
            if (project.getTodoTasks().includes(taskToDelete)) {
                project.removeTodoTask(taskToDelete);
            }
        });
    }

    function deleteProject(project) {
        confirmDeleteTasks(project);
        const index = projects.findIndex(item => item.getProjectID() === project.getProjectID());
        projects.splice(index, 1);
    }

    function confirmDeleteTasks(project) {
        if (confirm('Do you also want to delete its tasks?')) {
            const taskArray = project.getTodoTasks();
            taskArray.forEach(task => deleteTask(task.getTaskID()));
        }
    }

    function sortTasksByCompletionStatus(tasksToSort){
        return tasksToSort.slice().sort((a, b) => b.isComplete - a.isComplete)
    }

    function sortTasksByDueDate(tasksToSort) {
        return tasksToSort.slice().sort((a, b) => a.dueDate - b.dueDate);
    }

    function sortTasksByPriority(tasksToSort) {
        return tasksToSort.slice().sort((a, b) => b.priority - a.priority);
    }



    return { captureButtons, deleteProject, saveTask, sortTasksByCompletionStatus, sortTasksByDueDate, sortTasksByPriority }

})();

export default App