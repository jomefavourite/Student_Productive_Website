import {select} from '../util/init.js';

const level = select('.level');
const nextSemesterBtn = select('.next__semester');
const firstSemesterScore = select('#score1');
const secondSemesterScore = select('#score2');
const calcGpaBtn = select('#calcGpa');

let levelCount = 1;
let gpaArray = [];

nextSemesterBtn.addEventListener('click', () => {
  let firstScore = Number(firstSemesterScore.value);
  let secondScore = Number(secondSemesterScore.value);

  gpaArray.push(firstScore);
  gpaArray.push(secondScore);

  firstSemesterScore.value = '';
  secondSemesterScore.value = '';

  console.log(gpaArray);

  levelCount++;
  level.innerHTML = levelCount;
});

calcGpaBtn.addEventListener('click', () => {
  
})
