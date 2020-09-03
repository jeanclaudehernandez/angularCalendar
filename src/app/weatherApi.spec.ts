import getWeather from './weatherApi';
import {parseForecast} from './lib/helper';

describe('Weather Api', () => {

  it('should query current weather', async () => {
    const now = new Date();
    const result = await getWeather('london', now);
    now.setHours(-3, 0, 0, 0); // fix for timezone
    expect(result.current).toBeTruthy();
    const forecast = parseForecast(now, result);
    const [year, month, day] = forecast.date.split('-');
    const resultDate = new Date(`${year}-${month}-${day}`);
    expect(resultDate).toEqual(now);
  });

  it('should query forecast', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    tomorrow.setHours(0, 0, 0, 0);
    const result = await getWeather('london', tomorrow);
    expect(result.current).toBeTruthy();
    expect(result.forecast.forecastday.length).toEqual(3);
  });

  it('should query history', async () => {
    const past = new Date();
    past.setDate(past.getDate()  - 3);
    past.setHours(0, 0, 0, 0);
    const result = await getWeather('london', past);
    expect(result.forecast).toBeTruthy();
    const forecast = parseForecast(past, result);
    const [year, month, day] = forecast.date.split('-');
    const resultDate = new Date(`${year}-${month}-${day}`);
    resultDate.setHours(resultDate.getHours() + 3); // fix timezone
    expect(resultDate).toEqual(past);
  });

  it('should throw error on invalid date', async () => {
    const past8Days = new Date();
    past8Days.setDate(past8Days.getDate() - 8);
    past8Days.setHours(0, 0, 0, 0);
    expect(() => getWeather('london', past8Days))
      .toThrow('Date must be either up to 3 days in the future or 7 days in the past.');
  });

  it('should throw error on invalid city', async () => {
    const result = await getWeather('sadgafdas', new Date());
    expect(result.error.code).toEqual(1006);
  });
});
