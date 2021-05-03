import {select, selectAll, checkLocalStorage} from '../util/init.js';

const topic = select('#topic');
const textArea = select('#textarea');
const date = select('#date');
const checkboxes = selectAll('#checkbox');
const btnAdd = select('#addTasks');

const initialTasks = [
  {
    topic: 'Submit my assignment before Monday',
    description: 'Lorem ipsum dolor sit amet.',
    date: '1/05/21',
  },
  {
    topic: 'Loading',
    description: 'Lorem ipsum dolor sit amet.',
    date: '1/05/21',
  },
];

let tasks = checkLocalStorage(initialTasks, 'tasks');

buildTasks(tasks);

btnAdd.addEventListener('click', addTasks);

document.addEventListener('click', e => {
  if (e.target.classList.value === 'times' || e.target.id === 'checkbox') {
    return removeTasks(e.target);
  }
});

function addTasks() {
  if (topic.value.length === 0 && textArea.value.length === 0) {
    return alert('Tasks cannot be empty');
  }
  if (textArea.value.length === 0) {
    return alert('Description cannot be empty');
  }
  if (topic.value.length === 0) {
    return alert('Topic cannot be empty');
  }

  tasks.push({
    topic: topic.value,
    description: textArea.value,
    date: date.value,
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  buildTasks(tasks);
}

function buildTasks(tasks) {
  const tasksContainer = select('#tasks');
  tasksContainer.innerHTML = '';
  topic.value = '';
  textArea.value = '';
  tasks.forEach(task => {
    tasksContainer.innerHTML += `
    <div class="task">
      <input type="checkbox" id="checkbox" />
      <h2>${task.topic}</h2>
      <p contenteditable="true">${task.description}</p>
      <p>${task.date}</p>
      <span class="times">&times</span>
    </div>
  `;
  });
}

function removeTasks(e) {
  tasks = tasks.filter(task => {
    let topic = e.parentElement.querySelector('h2').textContent;

    console.log(topic);
    // return topic !== task.topic;
  });

  buildTasks(tasks);
  // localStorage.setItem('tasks', JSON.stringify(tasks));
}
