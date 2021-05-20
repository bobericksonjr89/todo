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
    projects.push(proj1);

    const proj2 = Project("Make Todo App", "work on it every day", "May 20th");
    window.proj2 = proj2;
    projects.push(proj2);

    // init
    DOM.displayTasks(tasks);

    // DOM capture
    const sidebarLinks = document.querySelectorAll('.sidebar__link');
    const mainContent = document.querySelector('main-content');

    // Event Handlers
    sidebarLinks.forEach(link => link.addEventListener('click', checkSidebarElementForToggle));
    //USE different events for each button...they're different buttons with different behaviors

    // functions
    function checkSidebarElementForToggle(e) {
        let element;
        if (e.target.className.includes('sidebar__projects')) {
            element = e.target.parentElement;
            DOM.displayProjects(element, projects);
        } else {
            element = e.target;
            DOM.displayTasks(tasks)
        }
        DOM.toggleActiveStatus(element, 'sidebar--active');
    }


})();