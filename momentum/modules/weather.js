const weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city');

export async function getWeather(url) {
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

city.addEventListener('change', () => {
    const newCity = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=4000964775bc92d3b449bf7044bc46ae&units=metric`;
    getWeather(newCity)
});
