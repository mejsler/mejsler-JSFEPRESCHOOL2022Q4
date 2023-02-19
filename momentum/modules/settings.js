import { showGreeting } from './greeting.js';
import { getWeather, city } from './weather.js';
import { getQuotes } from './quotes.js';
export let curLang = 'en';

const settingsIcon = document.querySelector('.settings-icon'),
  settingsContainer = document.querySelector('.settings-container'),
  settingsPopup = settingsContainer.querySelector('.settings-popup'),
  settingsWidgetVisibility = settingsContainer.querySelector(
    '.settings-hide .row'
  ),
  settingsList = settingsWidgetVisibility.children,
  setttingsLang = settingsContainer.querySelector('.settings-language');

const translateSettings = (lang) => {
  const dictionary = {
    Settings: 'Настройки',
    'Hide widgets': 'Спрятать виджет',
    Time: 'Время',
    Date: 'Дата',
    Greeting: 'Приветствие',
    Quotes: 'Цитаты',
    Weather: 'Погода',
    'Audio player': 'Аудио плеер',
    'Background source': 'Источник фоновых изображений',
    'Comma separated list of tags ': 'Теги через запятую',
    'Comma separated list of tags': 'Теги через запятую',
    Language: 'Язык',
  };
  if (lang === 'ru') {
    const langArr = Object.values(dictionary);
    for (let i = 0; i < 12; i++) {
      if (i === 9 || i === 10) {
        const keke = settingsContainer.querySelector(`.l${i}`);
        keke.setAttribute('placeholder', langArr[i]);
      } else {
        const keke = settingsContainer.querySelector(`.l${i}`);
        keke.textContent = langArr[i];
      }
    }
  } else {
    const langArr = Object.keys(dictionary);
    for (let i = 0; i < 12; i++) {
      if (i === 9 || i === 10) {
        const keke = settingsContainer.querySelector(`.l${i}`);
        keke.setAttribute('placeholder', langArr[i]);
      } else {
        const keke = settingsContainer.querySelector(`.l${i}`);
        keke.textContent = langArr[i];
      }
    }
  }
};
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
  localStorage.setItem('language', curLang);
};

const getLocalStorage = () => {
  const settings = [
    'time',
    'date',
    'greeting',
    'quotes',
    'weather',
    'player',
    'todo',
  ];
  for (let i = 0; i < settings.length; i++) {
    if (localStorage.getItem(settings[i])) {
      const check = JSON.parse(localStorage.getItem(settings[i]));
      settingsList[i].children[1].checked = check;
      const selector = settingsList[i].children[1].name;
      const widget = document.querySelector(`.${selector}`);
      if (!check) {
        widget.classList.remove('hide-widget');
      } else {
        widget.classList.add('hide-widget');
      }
    }
  }
  const selectedLang = setttingsLang.querySelector(
    `.${localStorage.getItem('language')}`
  );
  selectedLang.setAttribute('checked', true);
  selectedLang.click();
};

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

settingsWidgetVisibility.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'INPUT' && target.checked) {
    const widget = document.querySelector(`.${target.name}`);
    widget.classList.add('hide-widget');
  } else if (target.tagName === 'INPUT' && !target.checked) {
    const widget = document.querySelector(`.${target.name}`);
    widget.classList.remove('hide-widget');
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

setttingsLang.addEventListener('click', (event) => {
  if (event.target.tagName === 'INPUT') {
    curLang = event.target.classList[0];
    localStorage.setItem('language', curLang);
    showGreeting(curLang);
    translateSettings(curLang);
    getQuotes();
    let kekap = city.value;
    if (kekap) {
      getWeather(kekap, curLang);
    } else {
      getWeather('Minsk', curLang);
      if (curLang === 'ru') {
        city.setAttribute('placeholder', 'Минск')
      } else {
        city.setAttribute('placeholder', 'Minsk')
      }
      
    }
  }
});
