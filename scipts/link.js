function select(name) {
  return document.querySelector(name);
}

function selectAll(name) {
  return document.querySelectorAll(name);
}

// LocalStorage functionality
function checkLocalStorage(initialValue, check) {
  const localData = localStorage.hasOwnProperty(check);
  return localData ? JSON.parse(localStorage.getItem(check)) : initialValue;
}

const urlName = select('#urlName');
const createLinkBtn = select('.createLinks');
const search = select('.search');
const modal = select('.modal');
const title = select('.title');
const btnAdd = select('#addLink');

const initialLinks = [
  {
    title: 'RUN LMS',
    urlname: 'https://run.nhuniversities.com.ng/login/index.php',
  },
  {
    title: 'Student Portal',
    urlname: 'http://reg.run.edu.ng/index.php',
  },
];

let links = checkLocalStorage(initialLinks, 'links');

btnAdd.addEventListener('click', addLinks);
search.addEventListener('keyup', e => filterLinks(e));
createLinkBtn.addEventListener('click', () => {
  modal.classList.toggle('show');
});

buildLinks(links);

function buildLinks(links) {
  const linksContainer = select('.links__container');
  linksContainer.innerHTML = '';
  title.value = '';
  urlName.value = '';
  links.forEach(link => {
    linksContainer.innerHTML += `
    <a href=${link.urlname}>
      <div class="link">
        <img src="../images/www.svg" alt="world wide web" />
        <h5>${link.title}</h5>
      </div>
    </a>
  `;
  });
}

function addLinks(e) {
  e.preventDefault();

  if (title.value.length === 0 && urlName.value.length === 0) {
    return alert('Inputs cannot be empty');
  }
  if (title.value.length === 0) {
    return alert('Title cannot be empty');
  }
  if (urlName.value.length === 0) {
    return alert('The URL name cannot be empty');
  }

  links.push({
    title: title.value,
    urlname: urlName.value,
  });
  localStorage.setItem('links', JSON.stringify(links));
  buildLinks(links);
}

function filterLinks(e) {
  const links = selectAll('.link');
  const notFound = select('.notFound');

  const searching = e.target.value.toLowerCase();

  // Filters the links
  [...links].forEach(link => {
    console.log(link);
    const linkContent = link.lastElementChild.innerText;
    if (linkContent.toLowerCase().includes(searching)) {
      link.style.display = 'block';
    } else {
      link.style.display = 'none';
    }
  });

  const result = [...links].every(link => {
    return link.style.display === 'none';
  });

  result === true
    ? (notFound.style.display = 'block')
    : (notFound.style.display = 'none');
}
