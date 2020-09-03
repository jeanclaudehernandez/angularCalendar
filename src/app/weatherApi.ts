import { environment } from '@env/environment';
import { emonth } from './lib/helper';
import 'isomorphic-fetch';

const apiUrl = 'https://api.weatherapi.com/v1/';
const forecast = apiUrl + 'forecast.json';
const history = apiUrl + 'history.json';
const apiKey = environment.weatherApiKey;

export default function  getWeather(city: string, date: Date): Promise<any> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil(((date.getTime() - today.getTime()) / (1000 * 3600 * 24)));
  let url: string;
  if (diff < 3 && diff > 0) {
    url = `${forecast}?days=${diff + 1}&`;
  } else if (diff === 0) {
    url = `${forecast}?days=1&`;
  } else if (diff < 0 && diff >= -7) {
    const month = date.getMonth() + 1;
    url = `${history}?dt=${date.getFullYear()}-${emonth(month)}-${date.getDate()}&`;
  } else {
    throw Error('Date must be either up to 3 days in the future or 7 days in the past.');
  }
  url += `q=${city}&key=${apiKey}`;
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      resolve(response.json());
    }, (error) => {
      console.log(error);
      reject(error);
    });
  });
}

