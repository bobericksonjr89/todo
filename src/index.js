import Task from './Tasks';
import Project from './Projects';
import DOM from './domController.js';



const App = (() => {

    const tasks = [];
    window.tasks = tasks;
    const projects = [];

    const item1 = Task("clean", "clean the whole house", "tomorrow", "1");
    window.item1 = item1;
    tasks.push(item1);

    const item2 = Task("work", "work hard", "yesterday", "2");
    window.item2 = item2;
    tasks.push(item2);

    const item3 = Task("study", "study all day", "end of year", "3");
    window.item3 = item3;
    tasks.push(item3);

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
    function readyAllTasks() {
        if (!allTasksLink.className.includes('sidebar--active')) {
            DOM.toggleActiveStatus(allTasksLink, 'sidebar--active')
        }
        if (projectsLink.parentElement.className.includes('sidebar--active')) {
            DOM.clearProjectsList(projectsLink)
            DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
        }
        DOM.clearMainContent();
        DOM.displayTasks(tasks);
        captureButtons();
    }

    function readyProjects() {
        if (projectsLink.parentElement.className.includes('sidebar--active')) {
            DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
            DOM.clearProjectsList(projectsLink);
            return;
        }
        DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
        DOM.displayProjects(projectsLink, projects);
    }

    function readyNewTask() {

    }

    function readyNewProject() {

    }

    function captureButtons() {
        const deleteButtons = document.querySelectorAll('.task__delete');
        deleteButtons.forEach(button => button.addEventListener('click', function() {
            confirmDeletion(button);
        }));
    }

    function confirmDeletion(button) {
        if (confirm("You want to delete this task?")) {
            deleteTaskFromProjects(button.dataset.id);
            deleteTask(button.dataset.id);
            DOM.removeTask(button.parentElement);
        }
    }

    function deleteTask(taskID) { 
            const index = tasks.findIndex(task => task.getTaskID() === taskID);
            tasks.splice(index, 1);
    }

    function deleteTaskFromProjects(taskID) {
        const taskToDelete = tasks.find(task => task.getTaskID() === parseInt(taskID));
        console.log(taskToDelete);
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


    return { captureButtons, deleteProject }

})();

export default App