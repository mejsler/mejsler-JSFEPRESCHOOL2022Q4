import { timeOfDay } from './greeting.js';

const body = document.querySelector('body'),
  next = document.querySelector('.slide-next'),
  settingsPhoto = document.querySelector('.settings-photo .row'),
  prev = document.querySelector('.slide-prev'),
  unsplash = settingsPhoto.querySelector('.unsplash-tags'),
  flickr = settingsPhoto.querySelector('.flickr-tags');

let randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
let curSource = 'default';
let sourceTags = '';
const setBackground = (time, num, source, tags) => {
  let numStr = String(num);
  const img = new Image();
  async function getLinkToUnsplashImage(curTags) {
    const url = `https://api.unsplash.com/photos/random?query=${curTags}&client_id=YTdxYKBjL2J8_qgTW7yWWchhyO9-HLb3LVJZ8Z-uhlU`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.urls.regular;
  }
  async function getLinkToFlickrImage(curTags) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=bf0225f2b6d1b741a23cdaefc536f81b&tag_mode=all&tags=${curTags},nature&privacy_filter=1&safe_search=1&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.photos.photo[num].url_l;
  }
  if (source === 'unsplash') {
    img.src = '';
    if (sourceTags) {
      getLinkToUnsplashImage(tags);
    } else {
      getLinkToUnsplashImage(time[0]);
    }
  } else if (source === 'flickr') {
    img.src = '';
    if (sourceTags) {
      getLinkToFlickrImage(tags);
    } else {
      getLinkToFlickrImage(time[0]);
    }
  } else if (source === 'default') {
    img.src = `https://raw.githubusercontent.com/mejsler/stage1-tasks/assets/images/${time[0]}/${numStr.length === 1 ? numStr.padStart(2, 0) : numStr
      }.jpg`;
  }

  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  });
};

next.addEventListener('click', () => {
  randomNum === 20 ? (randomNum = 1) : randomNum++;
  setBackground(timeOfDay, randomNum, curSource, sourceTags);
});
prev.addEventListener('click', () => {
  randomNum === 1 ? (randomNum = 20) : randomNum--;
  setBackground(timeOfDay, randomNum, curSource, sourceTags);
});

unsplash.addEventListener('change', () => {
  sourceTags = unsplash.value.replace(/\s+/g, '');
  setBackground(timeOfDay, randomNum, curSource, sourceTags);
});

flickr.addEventListener('change', () => {
  sourceTags = flickr.value.replace(/\s+/g, '');
  setBackground(timeOfDay, randomNum, curSource, sourceTags);
});

settingsPhoto.addEventListener('click', (event) => {
  const target = event.target;
  if (
    target.classList.contains('unsplash') ||
    target.classList.contains('flickr')
  ) {
    unsplash.value = '';
    flickr.value = '';
    flickr.setAttribute('disabled', '');
    unsplash.setAttribute('disabled', '');
    sourceTags = '';
    curSource = target.classList[0];
    settingsPhoto
      .querySelector(`.${target.classList[0]}-tags`)
      .removeAttribute('disabled');
    setBackground(timeOfDay, randomNum, curSource, sourceTags);
  } else if (target.classList.contains('default')) {
    flickr.setAttribute('disabled', '');
    unsplash.setAttribute('disabled', '');
    unsplash.value = '';
    flickr.value = '';
    curSource = target.classList[0];
    setBackground(timeOfDay, randomNum, curSource, sourceTags);
  }
});

setBackground(timeOfDay, randomNum, curSource, sourceTags);

window.addEventListener('beforeunload', () => {
  localStorage.setItem('sourceTag', sourceTags);
  if (curSource !== null) {
    localStorage.setItem('source', curSource);
  } else {
    localStorage.setItem('source', 'default');
  }
});

window.addEventListener('load', () => {
  curSource = localStorage.getItem('source');
  sourceTags = localStorage.getItem('sourceTag');
  if (localStorage.getItem('source')) {
    if (curSource !== 'default') {
      const targetSrc = settingsPhoto.querySelector(`.${curSource}`);
      targetSrc.setAttribute('checked', true);
      const target = settingsPhoto.querySelector(`.${curSource}-tags`);
      target.removeAttribute('disabled');
      target.value = sourceTags;
      setBackground(timeOfDay, randomNum, curSource, sourceTags);
    }
    else {
      curSource = 'default';
      settingsPhoto.querySelector(`.${curSource}`).setAttribute('checked', true);
      setBackground(timeOfDay, randomNum, curSource, sourceTags);
    }
  }
});
