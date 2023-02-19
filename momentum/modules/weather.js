import { curLang } from './settings.js';

const weather = document.querySelector('.weather'),
  weatherIcon = weather.querySelector('.weather-icon'),
  temperature = weather.querySelector('.temperature'),
  weatherDescription = weather.querySelector('.weather-description'),
  wind = weather.querySelector('.wind'),
  humidity = weather.querySelector('.humidity'),
  error = weather.querySelector('.weather-error');

export const city = weather.querySelector('.city');

export async function getWeather(c, lang) {
  let url;
  if (lang === 'ru') {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&lang=ru&appid=4000964775bc92d3b449bf7044bc46ae&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&lang=en&appid=4000964775bc92d3b449bf7044bc46ae&units=metric`;
  }
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === '404') {
    if (lang === 'ru') {
      error.textContent = 'Город не найден';
    } else {
      error.textContent = 'City is not found';
    }
    temperature.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = '';
    weatherIcon.classList = '';
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
   if (lang === 'ru') {
    wind.textContent = `Ветер: ${Math.floor(data.wind.speed)} м/с`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
   } else {
    wind.textContent = `Wind: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
   }
    weatherDescription.textContent = data.weather[0].description;
    error.textContent = '';
  }
}

city.addEventListener('change', () => {
  const newCity = city.value;
  getWeather(newCity, curLang);
  localStorage.setItem('userCity', newCity);
});

window.addEventListener('load', () => {
  const theCity = localStorage.getItem('userCity');
  if (theCity) {
    getWeather(theCity, curLang);
    city.value = theCity;
  } else {
    getWeather('Minsk', curLang);
  }
});
