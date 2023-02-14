const hours = new Date().getHours();
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

export const showGreeting = () => {
  let result = '';
  switch (true) {
    case hours >= 6 && hours <= 11:
      result = 'morning';
      break;
    case hours >= 12 && hours <= 17:
      result = 'afternoon';
      break;
    case hours >= 18 && hours <= 23:
      result = 'evening';
      break;
    case hours >= 0 && hours <= 5:
      result = 'night';
      break;
  }
  greeting.textContent = `Good ${result}`;
  setTimeout(showGreeting, 1000 * 60 * 60);
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
