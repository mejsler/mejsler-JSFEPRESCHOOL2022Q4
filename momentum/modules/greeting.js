import { curLang } from './settings.js';

const hours = new Date().getHours(),
  greeting = document.querySelector('.greeting-container'),
  name = document.querySelector('.name');

export let timeOfDay;

export const showGreeting = (lang) => {
  switch (true) {
    case hours <= 5:
      timeOfDay = ['night', 'ночи', 'Доброй '];
      break;
    case hours <= 11:
      timeOfDay = ['morning', 'утро', 'Доброе '];
      break;
    case hours <= 17:
      timeOfDay = ['afternoon', 'день', 'Добрый '];
      break;
    case hours <= 23:
      timeOfDay = ['evening', 'вечер', 'Добрый '];
      break;
  }
  if (lang === 'ru') {
    greeting.textContent = `${timeOfDay[2]} ${timeOfDay[1]}`;
    name.setAttribute('placeholder', 'Как вас зовут?');
  } else {
    greeting.textContent = `Good ${timeOfDay[0]}`;
    name.setAttribute('placeholder', 'introduce yourself');
  }
};

const setLocalStorage = () => {
  localStorage.setItem('name', name.value);
};

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
};

window.addEventListener('load', getLocalStorage);

showGreeting(curLang);
