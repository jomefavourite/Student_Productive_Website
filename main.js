import {select, selectAll} from './util/init.js';

const hamburger = select('.hamburger');
const nav = select('.nav');
const navLists = selectAll('.nav__list__item a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('change');
  nav.classList.toggle('toggle-show');
  document.body.classList.toggle('overflow');
});

navLists.forEach(navList => {
  navList.addEventListener('click', () => {
    document.body.classList.remove('overflow');
  });
});
