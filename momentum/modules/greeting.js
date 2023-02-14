const hours = new Date().getHours(),
      greeting = document.querySelector('.greeting'),
      name = document.querySelector('.name');

export let timeOfDay = '';

export const showGreeting = () => {
  switch (true) {
    case hours >= 6 && hours <= 11:
      timeOfDay = 'morning';
      break;
    case hours >= 12 && hours <= 17:
      timeOfDay = 'afternoon';
      break;
    case hours >= 18 && hours <= 23:
      timeOfDay = 'evening';
      break;
    case hours >= 0 && hours <= 5:
      timeOfDay = 'night';
      break;
  }
  greeting.textContent = `Good ${timeOfDay}`;
  setTimeout(showGreeting, 1000);
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

showGreeting();
