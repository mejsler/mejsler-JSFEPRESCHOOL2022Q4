import { curLang } from './settings.js';
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const showDate = () => {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    hour12: false,
  };
  if (curLang === 'ru') {
    date.textContent = new Date().toLocaleDateString('ru-Ru', options);
  } else {
    date.textContent = new Date().toLocaleDateString('en-Us', options);
  }
};

const showTime = () => {
  time.textContent = new Date().toLocaleTimeString('ru-Ru');
  showDate();
  setTimeout(showTime, 1000);
};

showTime()