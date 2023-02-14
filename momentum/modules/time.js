const time = document.querySelector('.time');
const date = document.querySelector('.date');

export const showDate = () => {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    hour12: false,
  };
  date.textContent = new Date().toLocaleDateString('en-Us', options);
};

export const showTime = () => {
  time.textContent = new Date().toLocaleTimeString();
  showDate();
  setTimeout(showTime, 1000);
};
