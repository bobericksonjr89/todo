import Task from './Tasks';
import Project from './Projects';
import DOM from './domController';



const App = (() => {

    const tasks = [];
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

    const proj1 = Project("House Chores", "daily house chores", "Friday");
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

    // init
    DOM.displayTasks(tasks);

    // DOM capture
    const allTasksLink = document.querySelector('.sidebar__tasks');
    const projectsLink = document.querySelector('.sidebar__projects');


    // Event Handlers
    allTasksLink.addEventListener('click', readyAllTasks);
    projectsLink.addEventListener('click', readyProjects);

    // functions
    function readyAllTasks(e) {
        if (!allTasksLink.className.includes('sidebar--active')) {
            DOM.toggleActiveStatus(allTasksLink, 'sidebar--active')
        }
        if (projectsLink.parentElement.className.includes('sidebar--active')) {
            DOM.clearProjectsList(projectsLink)
            DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
        }
        DOM.clearMainContent();
        DOM.displayTasks(tasks);
    }

    function readyProjects(e) {
/*         if (allTasksLink.className.includes('sidebar--active')) {
            DOM.toggleActiveStatus(allTasksLink, 'sidebar--active')
        } */
        console.log('yo')
        if (projectsLink.parentElement.className.includes('sidebar--active')) {
            DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
            DOM.clearProjectsList(projectsLink);
            return;
        }
        DOM.toggleActiveStatus(projectsLink.parentElement, 'sidebar--active');
        DOM.displayProjects(projectsLink, projects);
    }

})();