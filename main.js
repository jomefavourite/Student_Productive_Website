import {select, selectAll} from './util/init.js';

const hamburger = select('.hamburger');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('change');
});
