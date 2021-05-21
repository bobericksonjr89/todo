import App from './index.js';

const DOM = (function() {

    // DOM Capture
    const mainContent = document.querySelector('.main-content');
    const projectsLink = document.querySelector('.sidebar__projects');

    // functions
    function clearMainContent() {
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
            titleDiv.classList.add('task__title', `task__title--priority${task.priority}`);
            titleDiv.innerText = task.title;

            const dueDateDiv = document.createElement('div')
            dueDateDiv.classList.add('task__due-date');
            dueDateDiv.innerText = task.dueDate;

            const deleteButton = document.createElement('button')
            deleteButton.classList.add('task__delete');
            deleteButton.setAttribute('data-id', task.getTaskID());
            deleteButton.innerText = 'Delete';

            taskDiv.append(checkmarkDiv, titleDiv, dueDateDiv, deleteButton);
            mainContent.append(taskDiv);
        })
    }

    function clearProjectsList(element) {
        const childNodes = element.childNodes;
        for (let i = childNodes.length - 1; i > 0; i--) {
            element.removeChild(childNodes[i]);
        }
    }

    function toggleActiveStatus(element, toggledClass) {
        element.classList.toggle(toggledClass);
    }

    function displayProjects(parentElement, projects) {
        projects.forEach((project) => {
            const projectButton = document.createElement('button');
            projectButton.classList.add('link', 'projects__project');
            projectButton.innerText = project.getTitle();
            projectButton.addEventListener('click', (e) => {
                e.stopPropagation();
                readyProjectTasks(projectButton, project);
            });

            parentElement.appendChild(projectButton);
        })
    }

    function readyProjectTasks(projectButton, project) {
        projectButton.classList.add('projects__project--active');
        clearMainContent();
        displayProjectHeader(project);
        displayTasks(project.getTodoTasks())
        App.captureButtons();
        resetAllTasksButton();
        resetProjectsButtons(projectButton);
    }

    function displayProjectHeader(project) {
        const projectHeaderDiv = document.createElement('div');
        projectHeaderDiv.classList.add('project-header');
        
        const projectHeaderTitle = document.createElement('h3');
        projectHeaderTitle.classList.add('project-header__title');
        projectHeaderTitle.innerText = project.getTitle();

        const projectHeaderDescription = document.createElement('p');
        projectHeaderDescription.classList.add('project-header__description');
        projectHeaderDescription.innerText = project.getDescription();

        const projectHeaderDeleteButton = document.createElement('button');
        projectHeaderDeleteButton.classList.add('project-header__delete');
        projectHeaderDeleteButton.innerText = "Delete";
        projectHeaderDeleteButton.addEventListener('click', function() {
            readyDeleteProject(project);
        });

        projectHeaderDiv.append(projectHeaderTitle, projectHeaderDescription, projectHeaderDeleteButton);
        mainContent.append(projectHeaderDiv);
    }


    function resetAllTasksButton() {
        document.querySelector('.sidebar__tasks').classList.remove('sidebar--active');
    }

    function resetProjectsButtons(exceptThisProject) {
        const childNodes = projectsLink.childNodes;
        for (let i = childNodes.length - 1; i > 0; i--) {
            if (childNodes[i].className.includes('projects__project--active') && childNodes[i] != exceptThisProject) {
                toggleActiveStatus(childNodes[i], 'projects__project--active');
            }
        }
    }

    function removeTask(div) {
        div.remove();
    };

    function readyDeleteProject(project) {
        if (confirm(`Do you really want to delete ${project.getTitle()}?`)) {
            //removeProject();
            App.deleteProject(project);
            clearMainContent();
            projectsLink.click();
            projectsLink.click();
            
        }
    }


    return { clearMainContent, displayTasks, clearProjectsList, toggleActiveStatus, displayProjects, removeTask };

})();


export default DOM