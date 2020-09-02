import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import "isomorphic-fetch"

const apiUrl = environment.weatherApiUrl;
const apiKey = environment.weatherApiKey;
const current = apiUrl + environment.weatherApiCurrentUrl;
const forecast = apiUrl + environment.weatherApiForecastUrl;
const history = apiUrl + environment.weatherApiHistoryUrl;

export default function  getWeather(city: string, date: Date): Promise<any> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = ((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  let url: string;
  if (diff <= 3 && diff > 0) {
    url = `${forecast}?days=${diff}&`;
  } else if (diff === 0) {
    url = `${forecast}?days=1&`;
  } else if (diff < 0 && diff >= -7) {
    const emonth = date.getMonth() + 1;
    const month = emonth  < 10 ? '0' + emonth : emonth;
    url = `${history}?dt=${date.getFullYear()}-${month}-${date.getDate()}&`;
  } else {
    throw Error('Date must be either up to 3 days in the future or 7 days in the past.');
  }
  url += `q=${city}&key=${apiKey}`;
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      resolve(response.json());
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}

