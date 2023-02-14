import { playlist } from './playlist.js';

const audio = document.querySelector('.audio'),
  play = document.querySelector('.play'),
  prev = document.querySelector('.play-prev'),
  list = document.querySelector('.play-list'),
  next = document.querySelector('.play-next');

let isPlaying = false;
let indexOfCurrentSong = 0;

function playAudio() {
  audio.src = playlist[indexOfCurrentSong].src;
  audio.currentTime = 0;
  for (const kek of list.children) {
    kek.classList.remove('item-active');
  }

  list.children[indexOfCurrentSong].classList.toggle('item-active');

  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    play.classList.toggle('pause');
  } else {
    audio.pause();
    isPlaying = false;
    play.classList.toggle('pause');
  }
}

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

play.addEventListener('click', playAudio);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
audio.addEventListener('ended', nextSong);

playlist.forEach((e) => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = e['title'];
  list.append(li);
});
