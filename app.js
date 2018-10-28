const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks)
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask)
  clearBtn.addEventListener('click', clearTasks)
  filter.addEventListener('keyup', filterTasks)
}

function getTasks() {
  let tasks = localStorage.getItem('tasks');

  if (tasks === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(tasks);
  }

  tasks.forEach(function (task) {
    createTaskElement(task);
  })
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Task field empty');
  }

  createTaskElement(taskInput.value);
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

function createTaskElement(task) {
  const li = document.createElement('li');

  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));

  const link = document.createElement('a');

  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></li>';
  li.appendChild(link)
  taskList.appendChild(li);
}

function storeTaskInLocalStorage(task) {
  let tasks = getTasksFromStorage();

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  const link = e.target.parentElement;

  if (link.classList.contains('delete-item')) {
    link.parentElement.remove();

    removeFromLocalStorage(link.parentElement);
  }
}

function getTasksFromStorage() {
  let tasks = localStorage.getItem('tasks');

  if (tasks === null) {
    return [];
  }

  return JSON.parse(tasks);
}

function removeFromLocalStorage(taskItem) {
  let tasks = getTasksFromStorage();

  tasks.forEach(function (task, index) {
    if (task === taskItem.textContent) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  )
}