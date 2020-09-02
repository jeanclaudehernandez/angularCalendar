import { Reminder, Day, Month, Weather } from './calendar';
import getWeather from '../weatherApi';
import * as moment from 'moment';

describe('Models', () => {
    const redColor = '#ff0000';
    const date = new Date();
    const today = moment(date).format('YYYY-MM-DD');
    const day = date.getDate();
    const description = 'testing';
    const city = 'london';

    describe('weather', () => {
        it('should create weather with right data', async () => {
            const today = new Date();
            const result = await getWeather(city, today);
            const forecast = result.forecast.forecastday[0].day;
            const weather = new Weather(forecast);
            expect(weather.maxTemp).toEqual(forecast.maxtemp_c);
        });
    });

    describe('Reminder', () => {
        it('should create a reminder with right data', () => {
            const reminder = new Reminder(description, today, city, redColor);
            expect(reminder.description).toEqual(description);
        });

        it('should get weather with right data', async () => {
            const reminder = new Reminder(description, today, city, redColor);
            await reminder.getWeather();
            expect(reminder.weather.maxTemp).toBeTruthy();
        });

        it('should error when date input is invalid', () => {
            expect (() => new Reminder(description, 'sasasadfa', city, redColor))
                .toThrow('Date and Time must be valid.');
        });

        it('should error when description is too long', () => {
            expect (() => new Reminder('1234567890123456789012345678901',
                today, city, redColor))
                    .toThrow('Reminder length has to be lower than 30.');
        });

        it('should error when city is empty', () => {
            expect (() => new Reminder(description,
                today, '', redColor))
                    .toThrow('Field City cannot be empty.');
        });

        it('should error when color is empty or undefined', () => {
            expect (() => new Reminder(description,
                today, city, ''))
                    .toThrow('Field Color cannot be empty.');
        });
    });

    describe('Day', () => {
        it('should create', () => {
            const dayInstance = new Day(day, today);
            expect(dayInstance.day).toEqual(day);
        });

        it('should throw error on invalid date', () => {
            expect(() => (new Day(day, 'dsfa'))).toThrow('Date and Time must be valid.');
        });

        it('should add reminder', () => {
            const dayInstance = new Day(day, today);
            dayInstance.addReminder({
                description,
                dateTime: today,
                city,
                color: redColor
            });
            expect(dayInstance.reminders[0].description).toBe(description);
            dayInstance.addReminder({
                description: description + '2',
                dateTime: today,
                city,
                color: redColor
            });
            expect(dayInstance.reminders[1].description).toBe(description + '2');
        });

        it('should remove reminder', () => {
            const dayInstance = new Day(day, today);
            dayInstance.addReminder({
                description: description + '1',
                dateTime: today,
                city,
                color: redColor
            });
            dayInstance.addReminder({
                description: description + '2',
                dateTime: today,
                city,
                color: redColor
            });
            dayInstance.addReminder({
                description: description + '3',
                dateTime: today,
                city,
                color: redColor
            });
            dayInstance.deleteReminder(1);
            expect(dayInstance.reminders[1].description).toBe(description + '3');
        });

        it('should remove all reminders', () => {
            const dayInstance = new Day(day, today);
            dayInstance.addReminder({
                description: description + '1',
                dateTime: today,
                city,
                color: redColor
            });
            dayInstance.addReminder({
                description: description + '2',
                dateTime: today,
                city,
                color: redColor
            });
            dayInstance.addReminder({
                description: description + '3',
                dateTime: today,
                city,
                color: redColor
            });
            dayInstance.deleteAllReminders();
            expect(dayInstance.reminders.length).toEqual(0);
        });
    });

    describe('Month', () => {
        const year = 2015;
        const month = 3;
        let monthInstance: Month;

        beforeEach(() => {
            monthInstance = new Month(year, month);
        });

        it('should correctly create month', () => {
           expect(monthInstance.days.length).toEqual(31);
           expect(monthInstance.tail).toEqual([1, 2, 3, 4]);
        });
    });
});
