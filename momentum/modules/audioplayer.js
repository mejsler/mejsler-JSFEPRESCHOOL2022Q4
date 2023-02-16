import { playlist } from './playlist.js';

const audio = document.querySelector('.audio'),
  play = document.querySelector('.play'),
  prev = document.querySelector('.play-prev'),
  list = document.querySelector('.play-list'),
  next = document.querySelector('.play-next'),
  volume = document.querySelector('.player-volume'),
  volumeButton = document.querySelector(`label[for='volume']`),
  progress = document.querySelector('.player-progress'),
  duration = document.querySelector('.duration'),
  song = document.querySelector('.song-name'),
  curTime = document.querySelector('.current-time');

let isPlaying = false;
let indexOfCurrentSong = 0;
let mouseDownOnSlider = false;

const playAudio = () => {
  audio.volume = volume.value / 100;
  if (
    String(audio.src).split('momentum/')[1] ===
    String(playlist[indexOfCurrentSong].src)
  ) {
    audio.pause();
  } else {
    audio.src = playlist[indexOfCurrentSong].src;
  }
  song.textContent = playlist[indexOfCurrentSong].title;

  for (const kek of list.children) {
    kek.classList.remove('item-active');
    kek.children[0].classList.remove('pause');
  }
  list.children[indexOfCurrentSong].classList.toggle('item-active');
  list.children[indexOfCurrentSong].children[0].classList.toggle('pause');
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    play.classList.toggle('pause');
  } else {
    audio.pause();
    isPlaying = false;
    play.classList.toggle('pause');
    list.children[indexOfCurrentSong].children[0].classList.toggle('pause');
  }
};

const nextSong = () => {
  indexOfCurrentSong === playlist.length - 1
    ? (indexOfCurrentSong = 0)
    : indexOfCurrentSong++;
  isPlaying = false;
  playAudio();
  play.classList.add('pause');
};

const prevSong = () => {
  indexOfCurrentSong === 0
    ? (indexOfCurrentSong = playlist.length - 1)
    : indexOfCurrentSong--;
  isPlaying = false;
  playAudio();
  play.classList.add('pause');
};

const changeVolume = () => {
  audio.volume = volume.value / 100;
  audio.volume === 0
    ? (volumeButton.textContent = '🔇')
    : (volumeButton.textContent = '🔊');
};

playlist.forEach((e) => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.classList.add('play', 'player-icon');
  li.classList.add('play-item');
  li.textContent = e['title'];
  li.append(btn);
  list.append(li);
});

play.addEventListener('click', playAudio);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
audio.addEventListener('ended', nextSong);
volume.addEventListener('input', changeVolume);

volumeButton.addEventListener('click', () => {
  if (audio.volume === 0) {
    audio.volume = 0.15;
    volume.value = 15;
    volumeButton.textContent = '🔊';
  } else {
    audio.volume = 0;
    volume.value = 0;
    volumeButton.textContent = '🔇';
  }
});

const calculateTime = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

const displayDuration = () => {
  duration.textContent = calculateTime(audio.duration);
};

const progressMax = () => {
  progress.max = Math.floor(audio.duration);
};

if (audio.readyState > 0) {
  displayDuration();
  progressMax();
} else {
  audio.addEventListener('loadedmetadata', () => {
    displayDuration();
    progressMax();
  });
}

list.addEventListener('click', (event) => {
  let target = event.target;
  if (target.tagName === 'LI' || target.tagName === 'BUTTON') {
    playlist.forEach((song, index) => {
      if (
        song.title === target.textContent ||
        song.title === target.parentElement.textContent
      ) {
        indexOfCurrentSong = index;
        playAudio();
      }
    });
  }
});

audio.addEventListener('timeupdate', () => {
  curTime.textContent = calculateTime(audio.currentTime);
  if (!mouseDownOnSlider) {
    progress.value = Math.floor(audio.currentTime);
  }
});

progress.addEventListener('change', () => {
  audio.currentTime = progress.value;
});

progress.addEventListener('mousedown', () => {
  mouseDownOnSlider = true;
});

progress.addEventListener('mouseup', () => {
  mouseDownOnSlider = false;
});