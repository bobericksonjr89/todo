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

    function clearProjectsList() {
        const childNodes = projectsLink.childNodes;
        for (let i = childNodes.length - 1; i > 0; i--) {
            projectsLink.removeChild(childNodes[i]);
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

    function resetProjectsButton() {
        document.querySelector('.sidebar__projects-container').classList.remove('sidebar--active');
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



    function newTaskForm(projects) {
        resetAllTasksButton();
        clearProjectsList();
        resetProjectsButton();

        const container = document.createElement('div');
        container.classList.add('task-form__container');

        const formContainer = document.createElement('form');
        formContainer.classList.add('task-form');

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('task-form__left-side');

        const title = document.createElement('input');
        title.classList.add('task-form__title');
        title.setAttribute('type', 'text');
        title.name = "title";
        title.placeholder = "Title";

        const description = document.createElement('textarea');
        description.classList.add('task-form__description');
        description.name = "description";
        description.placeholder = "Description";

        const projectsSelect = document.createElement('select');
        projectsSelect.classList.add('task-form__projects');
        projectsSelect.name = "project";

        const defaultOption = document.createElement('option');
        defaultOption.setAttribute('value', '');
        defaultOption.innerText = "Add to Project";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        projectsSelect.append(defaultOption);

        const noProject = document.createElement('option');
        noProject.setAttribute('value', '');
        noProject.innerText = "No Project";
        projectsSelect.append(noProject);

        projects.forEach(project => {
            const option = document.createElement('option');
            option.setAttribute('value', project.getTitle());
            option.innerText = project.getTitle();
            projectsSelect.append(option);
        });
        
        leftDiv.append(title, description, projectsSelect);

        const rightDiv = document.createElement('div');
        rightDiv.classList.add('task-form__right-side');

        const priorities = ['low', 'medium', 'high'];
        let priorityValue = 0;
        const priority = document.createElement('select');
        priority.classList.add('task-form__priority');
        priority.name = "priority";

        const defaultPriority = document.createElement('option');;
        defaultPriority.setAttribute('value', '');
        defaultPriority.innerText = "Choose Priority";
        defaultPriority.disabled = true;
        defaultPriority.selected = true;
        priority.append(defaultPriority);

        priorities.forEach(item => {
            const option = document.createElement('option');
            option.setAttribute('value', ++priorityValue);
            option.innerText = item;
            priority.append(option);
        });

        const dueDateGroup = document.createElement('div');
        dueDateGroup.classList.add('task-form__form-group');

        const dueDateLabel = document.createElement('label');
        dueDateLabel.classList.add('task-form__due-date-label');
        dueDateLabel.setAttribute('for', 'due-date');
        dueDateLabel.innerText = "Due Date:";

        const dueDate = document.createElement('input');
        dueDate.classList.add('task-form__due-date');
        dueDate.setAttribute('type', 'date');
        dueDate.name = "due-date";

        dueDateGroup.append(dueDateLabel, dueDate);

        const submit = document.createElement('input');
        submit.classList.add('task-form__submit');
        submit.setAttribute('type', 'submit');

        rightDiv.append(priority, dueDateGroup, submit);

        formContainer.append(leftDiv, rightDiv);
        container.append(formContainer);
        mainContent.append(container);
    }


    return { clearMainContent, displayTasks, clearProjectsList, toggleActiveStatus, displayProjects, removeTask, newTaskForm };

})();


export default DOM