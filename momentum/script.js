import * as time from './modules/time.js';
import * as greeting from './modules/greeting.js';
import * as slider from './modules/slider.js';

time.showTime();
slider.setBackground(greeting.timeOfDay, slider.randomNum);