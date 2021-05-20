const DOM = (function() {

    // DOM Capture
    const mainContent = document.querySelector('.main-content');

    // functions
    function clearMainContent() {
        console.log(mainContent.childNodes);
        const childNodes = mainContent.childNodes;
        for (let i = childNodes.length - 1; i > 0; i--) {
            mainContent.removeChild(childNodes[i]);
        }
    }

    function displayTasks(tasks) {
        tasks.forEach(task => {
            const taskDiv = document.createElement('div')
            taskDiv.classList.add('task');

            const checkmarkDiv = document.createElement('div')
            checkmarkDiv.classList.add('task__checkmark');

            checkmarkDiv.innerText = '☐'

            const titleDiv = document.createElement('div')
            titleDiv.classList.add('task__title');
            titleDiv.innerText = task.title;

            const dueDateDiv = document.createElement('div')
            dueDateDiv.classList.add('task__due-date');
            dueDateDiv.innerText = task.dueDate;

            const deleteButton = document.createElement('button')
            deleteButton.classList.add('task__delete');
            deleteButton.innerText = 'Delete';

            taskDiv.append(checkmarkDiv, titleDiv, dueDateDiv, deleteButton);
            mainContent.append(taskDiv);
        })
    }


    

    function toggleActiveStatus(element, toggledClass) {
        element.classList.toggle(toggledClass);
    }

    function displayProjects(parentElement, projects) {
        projects.forEach((project) => {
            const projectButton = document.createElement('button');
            projectButton.classList.add('link', 'projects__project');
            projectButton.innerText = project.title;
            parentElement.appendChild(projectButton);
        })
    }

    




    return { toggleActiveStatus, displayProjects, displayTasks, clearMainContent };

})();


export default DOM