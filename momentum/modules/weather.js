const weather = document.querySelector('.weather'),
  weatherIcon = weather.querySelector('.weather-icon'),
  temperature = weather.querySelector('.temperature'),
  weatherDescription = weather.querySelector('.weather-description'),
  city = weather.querySelector('.city'),
  wind = weather.querySelector('.wind'),
  humidity = weather.querySelector('.humidity'),
  error = weather.querySelector('.weather-error');

export async function getWeather(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  if (data.cod === '404') {
    error.textContent = 'City is not found';
    temperature.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = '';
    weatherIcon.classList = '';
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    wind.textContent = `Wind: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
    error.textContent = '';
  }
}

city.addEventListener('change', () => {
  const newCity = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=4000964775bc92d3b449bf7044bc46ae&units=metric`;
  getWeather(newCity);
});

getWeather(
  `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=4000964775bc92d3b449bf7044bc46ae&units=metric`
);
