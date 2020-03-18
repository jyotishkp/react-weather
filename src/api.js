import axios from 'axios';

function getWeather(position) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=0ba9b446415312d26e56f2196b060cd5&units=Metric`);
}

export default getWeather;