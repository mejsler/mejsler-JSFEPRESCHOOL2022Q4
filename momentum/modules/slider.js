import { timeOfDay } from './greeting.js';

const body = document.querySelector('body'),
  next = document.querySelector('.slide-next'),
  settingsPhoto = document.querySelector('.settings-photo .row'),
  prev = document.querySelector('.slide-prev');

let randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
export let curSource = 'default';
export const setBackground = (time, num, source) => {
  let numStr = String(num);
  const img = new Image();
  if (source === 'unsplash') {
    img.src = '';
    async function getLinkToUnsplashImage() {
      const url = `https://api.unsplash.com/photos/random?query=${time}&client_id=YTdxYKBjL2J8_qgTW7yWWchhyO9-HLb3LVJZ8Z-uhlU`;
      const res = await fetch(url);
      const data = await res.json();
      img.src = data.urls.regular;
    }
    getLinkToUnsplashImage();
  } else if (source === 'flickr') {
    img.src = '';
    async function getLinkToFlickrImage() {
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bf0225f2b6d1b741a23cdaefc536f81b&tags=${time}&privacy_filter=1&safe_search=1&extras=url_l&format=json&nojsoncallback=1`;
      const res = await fetch(url);
      const data = await res.json();
      img.src = data.photos.photo[num].url_l;
    }
    getLinkToFlickrImage();
  } else if (source === 'default') {
    img.src = `https://raw.githubusercontent.com/mejsler/stage1-tasks/assets/images/${time}/${
      numStr.length === 1 ? numStr.padStart(2, 0) : numStr
    }.jpg`;
  }

  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  });
};

next.addEventListener('click', () => {
  randomNum === 20 ? (randomNum = 1) : randomNum++;
  setBackground(timeOfDay, randomNum, curSource);
});
prev.addEventListener('click', () => {
  randomNum === 1 ? (randomNum = 20) : randomNum--;
  setBackground(timeOfDay, randomNum, curSource);
});

settingsPhoto.addEventListener('click', (event) => {
  if (event.target.tagName === 'INPUT') {
    curSource = event.target.classList[0];
    setBackground(timeOfDay, randomNum, curSource);
  }
});

setBackground(timeOfDay, randomNum, curSource);

window.addEventListener('beforeunload', () => {
  localStorage.setItem('source', curSource);
});

window.addEventListener('load', () => {
  curSource = localStorage.getItem('source');
  settingsPhoto.querySelector(`.${curSource}`).setAttribute('checked', true);
  setBackground(timeOfDay, randomNum, curSource);
});
