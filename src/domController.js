import App from './index.js';

const DOM = (() => {
  // DOM Capture
  const mainContent = document.querySelector('.main-content');
  const projectsLink = document.querySelector('.sidebar__projects');

  // functions
  function clearMainContent() {
    const { childNodes } = mainContent;
    for (let i = childNodes.length - 1; i > 0; i--) {
      mainContent.removeChild(childNodes[i]);
    }
  }

  function removeTasksFromMainContent() {
    const { childNodes } = mainContent;
    for (let i = childNodes.length - 1; i > 2; i--) {
      mainContent.removeChild(childNodes[i]);
    }
  }

  function taskView(button, task) {
    const parentDiv = button.parentElement.parentElement;
    if (parentDiv.dataset.expanded === 'true') {
      removeExpandedTask(parentDiv);
      return;
    }
    parentDiv.classList.add('task--expanded-height')
    parentDiv.dataset.expanded = true;

    window.setTimeout(() => {
      appendExpandedTask(parentDiv, task);
    }, 200);
  }

  function appendExpandedTask(parentDiv, task) {
    const expandedDiv = document.createElement('div');
    expandedDiv.classList.add('task__more');

    const description = document.createElement('div');
    description.innerText = task.description;
    description.classList.add('task__description');

    const dateAdded = document.createElement('div');
    dateAdded.innerText = `Added: ${task.parseDateAdded()}`;
    dateAdded.classList.add('task__date-added');

    const edit = document.createElement('button');
    edit.innerText = 'Edit';
    edit.classList.add('task__edit');
    edit.setAttribute('data-id', task.taskID)

    expandedDiv.append(description, dateAdded, edit);
    parentDiv.append(expandedDiv);
  }

  function removeExpandedTask(parentDiv) {
    parentDiv.removeChild(parentDiv.lastChild);
    parentDiv.classList.remove('task--expanded-height');
    parentDiv.dataset.expanded = false;
  }

  function appendTasksToMainContent(tasks) {
    tasks.forEach((task) => {
      const taskContainer = document.createElement('div')
      taskContainer.classList.add('task');

      const taskShrunk = document.createElement('div')
      taskShrunk.classList.add('task__shrunk');

      const checkmarkDiv = document.createElement('div')
      checkmarkDiv.classList.add('task__checkmark');
      if (task.isComplete === true) {
        checkmarkDiv.innerText = '???'
      } else {
        checkmarkDiv.innerText = '???'
      }
      checkmarkDiv.setAttribute('data-id', task.taskID);
      checkmarkDiv.tabIndex = 0;

      const titleDiv = document.createElement('div')
      titleDiv.classList.add('task__title', `task__title--priority${task.priority}`);
      titleDiv.innerText = task.title;
      titleDiv.setAttribute('data-id', task.taskID);
      titleDiv.tabIndex = 0;

      const dueDateDiv = document.createElement('div')
      dueDateDiv.classList.add('task__due-date');
      const dueDate = task.parseDueDate();
      dueDateDiv.innerText = dueDate; 
      dueDateDiv.setAttribute('data-id', task.taskID);

      const deleteButton = document.createElement('button')
      deleteButton.classList.add('task__delete');
      deleteButton.setAttribute('data-id', task.taskID);
      deleteButton.innerText = 'Delete';

      taskShrunk.append(checkmarkDiv, titleDiv, dueDateDiv, deleteButton);
      taskContainer.append(taskShrunk);
      mainContent.append(taskContainer);
    });
  }

  function appendSortBarToMainContent(tasks) {
    const sortDiv = document.createElement('div')
    sortDiv.classList.add('sort-bar');

    const sortCheck = document.createElement('button');
    sortCheck.classList.add('link', 'sort__checkmark');
    sortCheck.innerText = '???';
    sortCheck.addEventListener('click', () => {
      const sortedTasks = App.sortTasksByCompletionStatus(tasks);
      clearTasksAndAppendSortedTasks(sortedTasks);
    });

    const sortPriority = document.createElement('button');
    sortPriority.classList.add('link', 'sort__priority');
    sortPriority.innerText = 'Priority';
    sortPriority.addEventListener('click', () => {
      const sortedTasks = App.sortTasksByPriority(tasks);
      clearTasksAndAppendSortedTasks(sortedTasks);
    });

    const sortDueDate = document.createElement('button');
    sortDueDate.classList.add('link', 'sort__due-date');
    sortDueDate.innerText = 'Due Date';
    sortDueDate.addEventListener('click', () => {
      const sortedTasks = App.sortTasksByDueDate(tasks);
      clearTasksAndAppendSortedTasks(sortedTasks);
    });

    sortDiv.append(sortCheck, sortPriority, sortDueDate);
    mainContent.append(sortDiv);
  }

  function clearTasksAndAppendSortedTasks(sortedTasks) {
    removeTasksFromMainContent();
    appendTasksToMainContent(sortedTasks);
    App.captureButtons();
  }

  function toggleCompletionIcon(button) {
    if (button.innerText === '???') {
      button.innerText = '???';
    } else {
      button.innerText = '???';
    }
  }

  function clearProjectsList() {
    const { childNodes } = projectsLink;
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
      projectButton.innerText = project.title;
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
    appendSortBarToMainContent(project.todoTasks);
    appendTasksToMainContent(project.todoTasks);
    App.captureButtons();
    resetProjectsButtons(projectButton);
  }

  function displayAllTasksHeader() {
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('tasks__header');

    const headerTitle = document.createElement('h3');
    headerTitle.classList.add('project-header__title');
    headerTitle.innerText = 'All Tasks';

    headerDiv.append(headerTitle);
    mainContent.append(headerDiv);
  }

  function displayProjectHeader(project) {
    const projectHeaderDiv = document.createElement('div');
    projectHeaderDiv.classList.add('project-header');

    const projectHeaderTitle = document.createElement('h3');
    projectHeaderTitle.classList.add('project-header__title');
    projectHeaderTitle.innerText = project.title;

    const projectHeaderDescription = document.createElement('p');
    projectHeaderDescription.classList.add('project-header__description');
    projectHeaderDescription.innerText = project.description;

    const projectHeaderDeleteButton = document.createElement('button');
    projectHeaderDeleteButton.classList.add('project-header__delete');
    projectHeaderDeleteButton.innerText = 'Delete';
    projectHeaderDeleteButton.addEventListener('click', () => {
      readyDeleteProject(project);
    });

    projectHeaderDiv.append(projectHeaderTitle,
      projectHeaderDescription,
      projectHeaderDeleteButton);
    mainContent.append(projectHeaderDiv);
  }


  function resetProjectsButtons(exceptThisProject) {
    const { childNodes } = projectsLink;
    for (let i = childNodes.length - 1; i > 0; i--) {
      if (childNodes[i].className.includes('projects__project--active') && childNodes[i] !== exceptThisProject) {
        toggleActiveStatus(childNodes[i], 'projects__project--active');
      }
    }
  }

  function removeTask(div) {
    div.remove();
  }

  function readyDeleteProject(project) {
    if (confirm(`Do you really want to delete ${project.title}?`)) {
      App.deleteProject(project);
      clearMainContent();
      projectsLink.click();
      projectsLink.click();
    }
  }


  function taskForm(projects, task) {
    clearProjectsList();

    const container = document.createElement('div');
    container.classList.add('task-form__container');

    const formContainer = document.createElement('form');
    formContainer.classList.add('task-form');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('task-form__left-side');

    const title = document.createElement('input');
    title.classList.add('task-form__title');
    title.setAttribute('type', 'text');
    title.name = 'title';
    title.placeholder = ' Title';
    title.required = true;
    title.setAttribute('maxlength', '25');
    title.ariaLabel = 'task title';

    const description = document.createElement('textarea');
    description.classList.add('task-form__description');
    description.name = 'description';
    description.placeholder = ' Description';
    description.required = true;
    description.setAttribute('maxlength', '75');
    description.ariaLabel = 'task description';

    const projectsSelect = document.createElement('select');
    projectsSelect.classList.add('task-form__projects');
    projectsSelect.name = 'project';
    projectsSelect.required = true;
    projectsSelect.ariaLabel = 'select a project to which the task will be added';

    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', '');
    defaultOption.innerText = 'Add to Project';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    projectsSelect.append(defaultOption);

    const noProject = document.createElement('option');
    noProject.setAttribute('value', '');
    noProject.innerText = 'No Project';
    projectsSelect.append(noProject);

    projects.forEach((project) => {
      const option = document.createElement('option');
      option.setAttribute('value', project.title);
      option.innerText = project.title;
      projectsSelect.append(option);
    });

    leftDiv.append(title, description, projectsSelect);

    const rightDiv = document.createElement('div');
    rightDiv.classList.add('task-form__right-side');

    const priorities = ['Low', 'Medium', 'High'];
    let priorityValue = 0;
    const priority = document.createElement('select');
    priority.classList.add('task-form__priority');
    priority.name = 'priority';
    priority.required = true;
    priority.ariaLabel = 'select a priority for the task';

    const defaultPriority = document.createElement('option');
    defaultPriority.setAttribute('value', '');
    defaultPriority.innerText = 'Choose Priority';
    defaultPriority.disabled = true;
    defaultPriority.selected = true;
    priority.append(defaultPriority);

    priorities.forEach((item) => {
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
    dueDateLabel.innerText = 'Due Date:';

    const dueDate = document.createElement('input');
    dueDate.classList.add('task-form__due-date');
    dueDate.setAttribute('type', 'date');
    dueDate.name = 'due-date';
    dueDate.required = true;

    dueDateGroup.append(dueDateLabel, dueDate);

    const submit = document.createElement('input');
    submit.classList.add('task-form__submit');
    submit.setAttribute('type', 'submit');
    submit.value = 'Save';

    if (task) {
      title.value = task.title;
      description.value = task.description;

      projects.forEach((project) => {
        if (project.todoTasks.includes(task)) {
          projectsSelect.value = project.title;
        }
      });

      priority.value = task.priority;
      dueDate.valueAsDate = task.dueDate;
    }

    rightDiv.append(priority, dueDateGroup, submit);

    formContainer.append(leftDiv, rightDiv);
    container.append(formContainer);

    mainContent.appendChild(container);
  }

  function newProjectForm() {
    clearProjectsList();

    const container = document.createElement('div');
    container.classList.add('project-form__container');

    const formContainer = document.createElement('form');
    formContainer.classList.add('project-form');

    const title = document.createElement('input');
    title.classList.add('project-form__title');
    title.setAttribute('type', 'text');
    title.name = 'title';
    title.placeholder = ' Project Title';
    title.required = true;
    title.setAttribute('maxlength', '26');
    title.ariaLabel = 'project title';

    const description = document.createElement('textarea');
    description.classList.add('project-form__description');
    description.name = 'description';
    description.placeholder = ' Description';
    description.required = true;
    description.setAttribute('maxlength', '75');
    description.ariaLabel = 'project description';

    const submit = document.createElement('input');
    submit.classList.add('project-form__submit');
    submit.setAttribute('type', 'submit');
    submit.value = 'Save'

    formContainer.append(title, description, submit);

    container.append(formContainer);
    mainContent.append(container);
  }

  function displayTasksPage(tasks) {
    displayAllTasksHeader();
    appendSortBarToMainContent(tasks);
    appendTasksToMainContent(tasks.slice().sort((a, b) => a.taskID - b.taskID));
  }

  return {
    clearMainContent,
    displayTasksPage,
    taskView,
    toggleCompletionIcon,
    clearProjectsList,
    toggleActiveStatus,
    displayProjects,
    removeTask,
    taskForm,
    newProjectForm,
  };
})();

export default DOM;
