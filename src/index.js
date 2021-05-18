import Task from './Tasks'
import Project from './Projects'


const App = (() => {

    const items = [];
    const projects = [];




    const item1 = Item("clean", "clean the whole house", "tomorrow", "level 1");
    window.item1 = item1;

    const item2 = Item("work", "work hard", "yesterday", "level 2");
    window.item2 = item2;

    const item3 = Item("study", "study all day", "end of year", "level 3");
    window.item3 = item3;

    const proj1 = Project("house chores", "daily house chores", "Friday", "level 5");
    window.proj1 = proj1;

})();