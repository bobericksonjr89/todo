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

    function clearTasks() {
        const childNodes = mainContent.childNodes;
        for (let i = childNodes.length - 1; i > 0; i--) {
            if (childNodes[i].className.includes('task')) {
                mainContent.removeChild(childNodes[i]);
            }
        }
    }

    function taskView(button, task) {
        const parentDiv = button.parentElement.parentElement;
        if (parentDiv.dataset.expanded === 'true') {
            shrinkTask(parentDiv);
            return;
        }
        parentDiv.style.height = '8rem';
        parentDiv.dataset.expanded = true;

        window.setTimeout(function() {
            loadExpandedTask(parentDiv, task);
        }, 200);
    }

    function loadExpandedTask(parentDiv, task) {
        const expandedDiv = document.createElement('div');
        expandedDiv.classList.add('task__more');

        const description = document.createElement('div');
        description.innerText = task.description;
        description.classList.add('task__description');

        const dateAdded = document.createElement('div');
        dateAdded.innerText = `Added: ${task.parseDateAdded()}`;
        dateAdded.classList.add('task__date-added');

        const edit = document.createElement('button');
        edit.innerText = "Edit";
        edit.classList.add('task__edit');
        edit.setAttribute('data-id', task.getTaskID())

        expandedDiv.append(description, dateAdded, edit);
        parentDiv.append(expandedDiv);
    }

    function shrinkTask(parentDiv) {
        parentDiv.removeChild(parentDiv.lastChild);
        parentDiv.style.height = '4rem';
        parentDiv.dataset.expanded = false;
    }

    function displayTasks(tasks) {
        captureSortButtons(tasks);
        tasks.forEach(task => {
            const taskContainer = document.createElement('div')
            taskContainer.classList.add('task');

            const taskShrunk = document.createElement('div')
            taskShrunk.classList.add('task__shrunk');

            const checkmarkDiv = document.createElement('div')
            checkmarkDiv.classList.add('task__checkmark');
            if (task.isComplete === true) {
                checkmarkDiv.innerText = '☑'
            } else {
                checkmarkDiv.innerText = '☐'
            }
            checkmarkDiv.setAttribute('data-id', task.getTaskID());
            checkmarkDiv.tabIndex = 0;

            const titleDiv = document.createElement('div')
            titleDiv.classList.add('task__title', `task__title--priority${task.priority}`);
            titleDiv.innerText = task.title;
            titleDiv.setAttribute('data-id', task.getTaskID());
            titleDiv.tabIndex = 0;

            const dueDateDiv = document.createElement('div')
            dueDateDiv.classList.add('task__due-date');
            const dueDate = task.parseDueDate();
            dueDateDiv.innerText = dueDate; 
            dueDateDiv.setAttribute('data-id', task.getTaskID());

            const deleteButton = document.createElement('button')
            deleteButton.classList.add('task__delete');
            deleteButton.setAttribute('data-id', task.getTaskID());
            deleteButton.innerText = 'Delete';

            taskShrunk.append(checkmarkDiv, titleDiv, dueDateDiv, deleteButton);
            taskContainer.append(taskShrunk);
            mainContent.append(taskContainer);
        })
    }

    function captureSortButtons(tasks) {
        const sortByCheck = document.querySelector('.sort__checkmark');
        sortByCheck.addEventListener('click', function() {
            const sortedTasks = App.sortTasksByCompletionStatus(tasks);
            clearTasks();
            displayTasks(sortedTasks);
            App.captureButtons();
        });

        const sortByPriority = document.querySelector('.sort__priority');
        sortByPriority.addEventListener('click', function() {
            const sortedTasks = App.sortTasksByPriority(tasks);
            clearTasks();
            displayTasks(sortedTasks);
            App.captureButtons();
        });

        const sortByDueDate = document.querySelector('.sort__due-date');
        sortByDueDate.addEventListener('click', function() {
            const sortedTasks = App.sortTasksByDueDate(tasks);
            clearTasks();
            displayTasks(sortedTasks);
            App.captureButtons();
        })
    }

    function displaySortBar() {
        const sortDiv = document.createElement('div')
        sortDiv.classList.add('sort-bar');

        const sortCheck = document.createElement('button');
        sortCheck.classList.add('link', 'sort__checkmark');
        sortCheck.innerText = "☑";

        const sortPriority = document.createElement('button');
        sortPriority.classList.add('link', 'sort__priority');
        sortPriority.innerText = "Priority";

        const sortDueDate = document.createElement('button');
        sortDueDate.classList.add('link', 'sort__due-date');
        sortDueDate.innerText = "Due Date";
    
        sortDiv.append(sortCheck, sortPriority, sortDueDate);    
        mainContent.append(sortDiv);
    }

    function toggleCompletionIcon(button) {
        if (button.innerText === '☑') {
            button.innerText = '☐';
        } else {
            button.innerText = '☑';
        }
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
        displaySortBar();
        displayTasks(project.getTodoTasks());
        App.captureButtons();
        resetAllTasksButton();
        resetProjectsButtons(projectButton);
    }

    function displayAllTasksHeader() {
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('project-header');

        const headerTitle = document.createElement('h3');
        headerTitle.classList.add('project-header__title');
        headerTitle.innerText = "All Tasks";

        headerDiv.append(headerTitle);
        mainContent.append(headerDiv);
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


    function taskForm(projects, task) {
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
        title.placeholder = " Title";
        title.required = true;
        title.setAttribute('maxlength', '25');
        title.ariaLabel = "task title";

        const description = document.createElement('textarea');
        description.classList.add('task-form__description');
        description.name = "description";
        description.placeholder = " Description";
        description.required = true;
        description.setAttribute('maxlength', '75');
        description.ariaLabel = "task description";

        const projectsSelect = document.createElement('select');
        projectsSelect.classList.add('task-form__projects');
        projectsSelect.name = "project";
        projectsSelect.required = true;
        projectsSelect.ariaLabel = "select a project to which the task will be added";

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

        const priorities = ['Low', 'Medium', 'High'];
        let priorityValue = 0;
        const priority = document.createElement('select');
        priority.classList.add('task-form__priority');
        priority.name = "priority";
        priority.required = true;
        priority.ariaLabel = "select a priority for the task";

        const defaultPriority = document.createElement('option');
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
        dueDate.required = true;

        dueDateGroup.append(dueDateLabel, dueDate);

        const submit = document.createElement('input');
        submit.classList.add('task-form__submit');
        submit.setAttribute('type', 'submit');

        if (task) {
            title.value = task.title;
            description.value = task.description;
            
            projects.forEach((project) => {
                if (project.getTodoTasks().includes(task)) {
                    projectsSelect.value = project.getTitle();
                }
            });

            priority.value = task.priority;
            dueDate.valueAsDate = task.dueDate;
            submit.dataset.isEdit = true;
        }

        rightDiv.append(priority, dueDateGroup, submit);

        formContainer.append(leftDiv, rightDiv);
        container.append(formContainer);
        
        mainContent.appendChild(container);
    }

    function newProjectForm() {
        resetAllTasksButton();
        clearProjectsList();
        resetProjectsButton();

        const container = document.createElement('div');
        container.classList.add('project-form__container');

        const formContainer = document.createElement('form');
        formContainer.classList.add('project-form');

        const title = document.createElement('input');
        title.classList.add('project-form__title');
        title.setAttribute('type', 'text');
        title.name = "title";
        title.placeholder = " Project Title";
        title.required = true;
        title.setAttribute('maxlength', '26');
        title.ariaLabel = "project title";
        

        const description = document.createElement('textarea');
        description.classList.add('project-form__description');
        description.name = "description";
        description.placeholder = " Description";
        description.required = true;
        description.setAttribute('maxlength', '75');
        description.ariaLabel = "project description";

        const submit = document.createElement('input');
        submit.classList.add('project-form__submit');
        submit.setAttribute('type', 'submit');

        formContainer.append(title, description, submit);

        container.append(formContainer);
        mainContent.append(container);
    }

    function displayLoadedTasks(tasks){
        displayAllTasksHeader();
        displaySortBar();
        displayTasks(tasks);
    }


    return { 
        clearMainContent,
        displayLoadedTasks,
        taskView,
        displayTasks,
        toggleCompletionIcon,
        clearProjectsList,
        toggleActiveStatus,
        displayProjects,
        displayAllTasksHeader,
        displaySortBar,
        removeTask,
        taskForm,
        newProjectForm
    };

})();


export default DOM