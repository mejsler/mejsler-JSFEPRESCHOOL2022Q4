import * as time from './modules/time.js';
import * as greeting from './modules/greeting.js';
import * as slider from './modules/slider.js';
import * as weather from './modules/weather.js';

time.showTime();
slider.setBackground(greeting.timeOfDay, slider.randomNum);
weather.getWeather(
  `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=4000964775bc92d3b449bf7044bc46ae&units=metric`
);
