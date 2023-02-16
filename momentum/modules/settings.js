const settingsIcon = document.querySelector('.settings-icon'),
      settingsContainer = document.querySelector('.settings-container'),
      settingsPopup = document.querySelector('.settings-popup'),
      settingsWidgetVisibility = document.querySelector('.settings-widgets-block .row'),
      settingsList = settingsWidgetVisibility.children;

const setLocalStorage = () => {
  const settings = [];
  for (let i = 0; i < settingsList.length; i++) {
    settings.push([
      settingsList[i].children[1].name,
      settingsList[i].children[1].checked,
    ]);
  }
  settings.forEach((e) => {
    localStorage.setItem(e[0], e[1]);
  });
};

const getLocalStorage = () => {
  const settings = [
    'time',
    'date',
    'greeting',
    'quotes',
    'weather',
    'player',
    'todolist',
  ];
  for (let i = 0; i < settings.length; i++) {
    if (localStorage.getItem(settings[i])) {
      const check = JSON.parse(localStorage.getItem(settings[i]));
      settingsList[i].children[1].checked = check;
      const selector = settingsList[i].children[1].name;
      const widget = document.querySelector(`.${selector}`);
      if (check) {
        widget.classList.remove('hide-widget');
      } else {
        widget.classList.add('hide-widget');
      }
    }
  }
};

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

settingsWidgetVisibility.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'INPUT' && target.checked) {
    const widget = document.querySelector(`.${target.name}`);
    widget.classList.remove('hide-widget');
  } else if (target.tagName === 'INPUT' && !target.checked) {
    const widget = document.querySelector(`.${target.name}`);
    widget.classList.add('hide-widget');
  }
});

settingsIcon.addEventListener('click', () => {
  settingsContainer.classList.toggle('settings-show');
});

settingsContainer.addEventListener('click', (event) => {
  if (
    !settingsPopup.contains(event.target) ||
    event.target.classList.contains('close')
  ) {
    settingsContainer.classList.remove('settings-show');
  }
});