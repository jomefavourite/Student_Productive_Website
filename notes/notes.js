import {select, selectAll, checkLocalStorage} from '../util/init.js';

const topic = select('#topic');
const textArea = select('#textarea');
const color = select('#color');
const btnAdd = select('.button__add');
const search = select('.search');
const deleteIcons = selectAll('.times');

let clr = '';

let initialNotes = [
  {topic: 'Demo', description: 'Hello everyone'},
  {topic: 'Hello', description: 'Hello everyone'},
];

let notes = checkLocalStorage(initialNotes, 'notes');

buildNotes(notes);

btnAdd.addEventListener('click', addNotes);
search.addEventListener('keyup', e => {
  filterNotes(e);
});
color.addEventListener('input', function (e) {
  return (clr = e.target.value);
});
document.addEventListener('click', e => {
  if (e.target.classList.value === 'times') {
    return removeNote(e.target);
  }
});

function addNotes() {
  if (topic.value.length === 0 && textArea.value.length === 0) {
    return alert('Notes cannot be empty');
  }
  if (textArea.value.length === 0) {
    return alert('Description cannot be empty');
  }
  if (topic.value.length === 0) {
    return alert('Topic cannot be empty');
  }
  notes.push({topic: topic.value, description: textArea.value});
  localStorage.setItem('notes', JSON.stringify(notes));
  buildNotes(notes);
}

function buildNotes(notes) {
  const result = select('#result');
  result.innerHTML = '';
  topic.value = '';
  textArea.value = '';
  notes.forEach(note => {
    result.innerHTML += `
    <div class="note" style="background-color: ${clr || color.value}">
      <h2>${note.topic}</h2>
      <p contenteditable="true">${note.description}</p>
      <span class="times">&times</span>
    </div>
  `;
  });
}

function removeNote(e) {
  notes = notes.filter(note => {
    let topic = e.parentElement.querySelector('h2').textContent;
    return topic !== note.topic;
  });
  buildNotes(notes);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function filterNotes(e) {
  const notes = selectAll('.note');
  notes.forEach(note => {
    const title = note.firstElementChild.textContent;
    if (title.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1) {
      note.style.display = 'block';
    } else {
      note.style.display = 'none';
    }
  });
}
