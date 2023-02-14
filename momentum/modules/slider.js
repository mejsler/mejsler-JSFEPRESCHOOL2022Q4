import { timeOfDay } from './greeting.js';

const body = document.querySelector('body');
const next = document.querySelector('.slide-next');
const prev = document.querySelector('.slide-prev');

export let randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);

export const setBackground = (time, num) => {
  let numStr = String(num);
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/mejsler/stage1-tasks/assets/images/${time}/${
    numStr.length === 1 ? numStr.padStart(2, 0) : numStr
  }.jpg`;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  });
};

export const getNextSlide = () => {
  randomNum === 20 ? (randomNum = 1) : randomNum++;
  setBackground(timeOfDay, randomNum);
};

export const getPrevSlide = () => {
  randomNum === 1 ? (randomNum = 20) : randomNum--;
  setBackground(timeOfDay, randomNum);
};

next.addEventListener('click', getNextSlide);
prev.addEventListener('click', getPrevSlide);
