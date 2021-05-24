import {select, selectAll, checkLocalStorage} from '../util/init.js';

const topic = select('#topic');
const textArea = select('#textarea');
const btnAdd = select('.button__add');
const search = select('.search');
const createNotesBtn = select('#createNotes');
const modal = select('.modal');

let initialNotes = [
  {topic: 'Demo', description: 'Hello everyone'},
  {topic: 'Hello', description: 'Hello everyone'},
];

let notes = checkLocalStorage(initialNotes, 'notes');

buildNotes(notes);

btnAdd.addEventListener('click', addNotes);
search.addEventListener('keyup', e => filterNotes(e));
createNotesBtn.addEventListener('click', () => {
  modal.classList.toggle('show');
});
document.addEventListener('click', e => {
  if (e.target.classList.value === 'times') {
    return removeNote(e.target);
  }

  if (e.target.keyCode === 13) {
    addNotes();
  }
});

function addNotes(e) {
  e.preventDefault();
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
  // style="background-color: ${clr || color.value}"
  notes.forEach(note => {
    result.innerHTML += `
    <div class="note" >
      <h2 contenteditable="false">${note.topic}</h2>
      <pre contenteditable="false">${note.description}</pre>
      <span class="times">&times</span>
      <p class="edit">edit</p>
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
  const notFound = select('.notFound');

  const searching = e.target.value.toLowerCase();

  // Filters the notes
  [...notes].forEach(note => {
    const noteContent = note.firstElementChild.innerText;
    if (noteContent.toLowerCase().includes(searching)) {
      note.style.display = 'block';
    } else {
      note.style.display = 'none';
    }
  });

  const result = [...notes].every(note => {
    return note.style.display === 'none';
  });

  result === true
    ? (notFound.style.display = 'block')
    : (notFound.style.display = 'none');
}
